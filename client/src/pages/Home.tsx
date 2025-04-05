import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckSquare, Clock, Timer, BarChart, BookOpen, ArrowRight, Smartphone, Download, Wifi, WifiOff } from "lucide-react";
import { useIsAndroid } from "@/hooks/use-standalone";

export default function Home() {
  const isAndroid = useIsAndroid();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold">
            ISI MSQE Study Tracker
          </CardTitle>
          <CardDescription className="text-lg">
            Optimize your preparation journey for the Indian Statistical Institute's Master of Science in Quantitative Economics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-foreground/70">
                A comprehensive tool designed to help you track progress, manage time, and optimize your study plan for the ISI MSQE entrance examination.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <CheckSquare className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Track Progress</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Track your progress through all four phases of preparation with intuitive checklists and progress visualization.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Timer className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Manage Time</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Boost productivity with study timer and Pomodoro technique. Track study sessions and analyze your time management.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Access Resources</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>Get phase-specific recommendations for books, courses, and study materials to optimize your preparation strategy.</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Android App Banner */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Mobile App Available</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">Get the Android App</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download our Android app for a better experience with these features:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <WifiOff className="h-4 w-4 text-primary/70" />
                        <span>Full offline functionality</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Smartphone className="h-4 w-4 text-primary/70" />
                        <span>Native mobile experience</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary/70" />
                        <span>Background timers and notifications</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    {isAndroid ? (
                      <Button className="w-full sm:w-auto" size="lg" asChild>
                        <a href="/download-apk.html" target="_blank" rel="noopener">
                          <Download className="mr-2 h-4 w-4" /> Download APK
                        </a>
                      </Button>
                    ) : (
                      <Button className="w-full sm:w-auto" size="lg" variant="outline">
                        <Smartphone className="mr-2 h-4 w-4" /> Available for Android
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Study Plan Timeline</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Phase 1: Foundation Building (Apr - Dec 2025)</li>
                <li>Phase 2: Core Prep (Jan - Oct 2026)</li>
                <li>Phase 3: Advanced Prep (Nov 2026 - Jun 2027)</li>
                <li>Phase 4: Final Preparation (Jul 2027 - Feb 2028)</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto" size="lg">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/tracker">
            <Button className="w-full sm:w-auto" size="lg" variant="outline">
              Go to Study Tracker
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
