import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, Info, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useStandalone, useIsAndroid } from '@/hooks/use-standalone';

export default function AndroidDownloadPage() {
  const [downloadClicked, setDownloadClicked] = useState(false);
  const isStandalone = useStandalone();
  const isAndroid = useIsAndroid();

  const handleDownload = () => {
    setDownloadClicked(true);
    // Provide the direct link to the APK file
    window.open('/isi-msqe-study-tracker-demo.apk', '_blank');
  };

  return (
    <div className="container py-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Android App Download</h1>
        <p className="text-muted-foreground">
          Get the ISI MSQE Study Tracker app on your Android device for offline access and native features
        </p>
      </div>

      <Alert variant="default" className="border-primary/30 bg-primary/5">
        <Info className="h-4 w-4" />
        <AlertTitle>Enhanced Mobile Experience</AlertTitle>
        <AlertDescription>
          Our Android app offers offline access to all your study data, native notifications, and improved performance.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="download" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="download">Download</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="download" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Download APK File</CardTitle>
                  <CardDescription>Direct download of the Android application package</CardDescription>
                </div>
                <Badge variant="outline" className="px-3 py-1">
                  Version 1.0.0
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">ISI MSQE Study Tracker</p>
                    <p className="text-xs text-muted-foreground">~2MB • Android 5.0+</p>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4 bg-card/50">
                  <h3 className="font-medium mb-2">What's included:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Full ISI study tracker functionality</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Offline access to your study data</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Native Android notifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download APK File
              </Button>
              
              {downloadClicked && (
                <Alert variant="default" className="border-green-500/30 bg-green-500/5">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle>Download Started</AlertTitle>
                  <AlertDescription>
                    If your download didn't start automatically, click the button again or try using the direct link.
                  </AlertDescription>
                </Alert>
              )}
              
              {isAndroid && !isStandalone && (
                <Alert variant="default" className="border-blue-500/30 bg-blue-500/5">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertTitle>Install as PWA</AlertTitle>
                  <AlertDescription>
                    You can also install this app as a PWA through your browser by adding it to your home screen.
                  </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="installation" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
              <CardDescription>
                Follow these steps to install the app on your Android device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Step 1: Download the APK</h3>
                  <p className="text-sm text-muted-foreground">
                    Download the APK file by clicking the "Download APK File" button in the Download tab.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Step 2: Enable Unknown Sources</h3>
                  <p className="text-sm text-muted-foreground">
                    On your Android device, go to Settings &gt; Security (or Privacy) and enable &quot;Install from Unknown Sources&quot; or &quot;Install Unknown Apps&quot; for your browser.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Step 3: Install the APK</h3>
                  <p className="text-sm text-muted-foreground">
                    Open the downloaded APK file from your notifications or file manager and tap &quot;Install&quot;. Follow the on-screen instructions to complete the installation.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Step 4: Open the App</h3>
                  <p className="text-sm text-muted-foreground">
                    Once installed, tap &quot;Open&quot; or find the ISI MSQE Study Tracker icon in your app drawer to launch it.
                  </p>
                </div>
              </div>
              
              <Alert variant="default" className="border-yellow-500/30 bg-yellow-500/5">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertTitle>Security Notice</AlertTitle>
                <AlertDescription>
                  Your device might show a security warning when installing apps from outside the Play Store. This is normal and you can safely proceed with the installation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Android App Features</CardTitle>
              <CardDescription>
                Exclusive features available in the Android application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      Offline Access
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Access all your study data, resources, and progress tracking even without an internet connection.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      Native Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Get study reminders and schedule alerts through the Android notification system.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      Enhanced Performance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Smoother experience and faster loading times compared to the web version.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      Seamless Integration
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Better integration with device features like file system for importing/exporting study data.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={handleDownload} className="flex items-center">
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
                  </Button>
                  
                  <Button variant="secondary" asChild>
                    <a href="https://isi.ac.in/~cscprof/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Learn More About ISI MSQE
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}