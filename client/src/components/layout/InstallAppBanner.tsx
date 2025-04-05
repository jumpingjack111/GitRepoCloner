import { useEffect, useState } from 'react';
import { useStandalone, useIsAndroid, useIsNative } from '@/hooks/use-standalone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

// Keep track of installation events
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

// Declare the beforeinstallprompt event
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function InstallAppBanner() {
  const isStandalone = useStandalone();
  const isAndroid = useIsAndroid();
  const isNative = useIsNative();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showDownloadLink, setShowDownloadLink] = useState(false);

  useEffect(() => {
    // Only show banner if not in standalone mode and not in native app
    if (!isStandalone && !isNative) {
      // Check if user has dismissed the banner before
      const hasDismissed = localStorage.getItem('installBannerDismissed') === 'true';
      
      if (!hasDismissed) {
        setShowBanner(true);
        
        // Show download link for Android devices
        if (isAndroid) {
          setShowDownloadLink(true);
        }
      }
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show banner if not previously dismissed
      const hasDismissed = localStorage.getItem('installBannerDismissed') === 'true';
      if (!hasDismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isStandalone, isAndroid, isNative]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowBanner(false);
      } else {
        console.log('User dismissed the install prompt');
      }
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Remember user's choice
    localStorage.setItem('installBannerDismissed', 'true');
  };

  if (!showBanner) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 shadow-lg bg-primary-950 border-primary-800">
      <CardContent className="p-4 relative">
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
        
        <h3 className="text-lg font-semibold mb-2 text-white">Enhance Your Experience</h3>
        
        {deferredPrompt && (
          <>
            <p className="text-sm text-gray-300 mb-3">
              Install this app on your device for a better experience with offline access and improved performance.
            </p>
            <Button 
              onClick={handleInstallClick}
              className="w-full bg-primary-500 hover:bg-primary-600"
            >
              Install App
            </Button>
          </>
        )}
        
        {showDownloadLink && !deferredPrompt && (
          <>
            <p className="text-sm text-gray-300 mb-3">
              Download our Android app for the best study tracking experience with offline access.
            </p>
            <Button
              className="w-full bg-primary-500 hover:bg-primary-600"
              asChild
            >
              <a href="/download-apk.html" target="_blank" rel="noopener">
                Download Android App
              </a>
            </Button>
          </>
        )}
        
        {!deferredPrompt && !showDownloadLink && (
          <p className="text-sm text-gray-300">
            Add this app to your home screen for a better experience with offline access.
          </p>
        )}
      </CardContent>
    </Card>
  );
}