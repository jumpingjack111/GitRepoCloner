import { useEffect, useState } from 'react';

/**
 * Hook to detect if the app is running in standalone mode (PWA or native app)
 * @returns Boolean indicating if app is in standalone mode
 */
export function useStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running in Capacitor (native app)
    const isCapacitor = 
      window.Capacitor !== undefined && 
      window.Capacitor.isNative === true;
    
    // Check if running as PWA in standalone mode
    const isPWA = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;

    setIsStandalone(isCapacitor || isPWA);
  }, []);

  return isStandalone;
}

/**
 * Hook to detect if the app is running on a device with Android OS
 * @returns Boolean indicating if device OS is Android
 */
export function useIsAndroid() {
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  return isAndroid;
}

/**
 * Hook to detect if the app is running as a native Capacitor app
 * @returns Boolean indicating if app is running as a native app
 */
export function useIsNative() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(
      window.Capacitor !== undefined && 
      window.Capacitor.isNative === true
    );
  }, []);

  return isNative;
}

/**
 * Declare Capacitor global to avoid TypeScript errors
 */
declare global {
  interface Window {
    Capacitor?: {
      isNative: boolean;
    };
  }
}