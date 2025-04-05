import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            ISI MSQE Study Tracker
          </CardTitle>
          <CardDescription>
            Track your progress through the ISI MSQE preparation journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-foreground/70">
              This application helps you track your progress through each phase of the ISI MSQE preparation journey. 
              The tracker includes four comprehensive study phases spanning from foundation building to final preparation.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Phase 1: Foundation Building (Apr - Dec 2025)</li>
              <li>Phase 2: Core Prep (Jan - Oct 2026)</li>
              <li>Phase 3: Advanced Prep (Nov 2026 - Jun 2027)</li>
              <li>Phase 4: Final Preparation (Jul 2027 - Feb 2028)</li>
            </ul>
            <div className="pt-4">
              <Link href="/tracker">
                <Button className="w-full">
                  Go to Study Tracker
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
