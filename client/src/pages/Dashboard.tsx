import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckSquare, 
  Clock, 
  Timer, 
  BarChart4, 
  BookOpen, 
  Plus,

  ArrowUpRight
} from 'lucide-react';
import { trackerData } from '@/lib/trackerData';

export default function Dashboard() {
  // Calculate progress statistics
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [phaseProgress, setPhaseProgress] = useState<{[key: string]: number}>({});
  const [studyTime, setStudyTime] = useState<number>(0);
  
  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('isiMsqeProgress');
    const progress = savedProgress ? JSON.parse(savedProgress) : {};
    
    // Calculate total tasks and completed tasks
    let totalTasks = 0;
    let completedTasks = 0;
    const phaseStats: {[key: string]: {total: number; completed: number}} = {};
    
    trackerData.forEach(section => {
      const phaseId = section.phase.split(':')[0].toLowerCase().replace(/\s+/g, '');
      const total = section.tasks.length;
      let completed = 0;
      
      section.tasks.forEach((task, index) => {
        const key = `${phaseId}-task${index + 1}`;
        if (progress[key]) {
          completed++;
          completedTasks++;
        }
      });
      
      totalTasks += total;
      phaseStats[phaseId] = { total, completed };
    });
    
    // Calculate percentages
    const overall = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    setOverallProgress(overall);
    
    const phasePercentages: {[key: string]: number} = {};
    Object.entries(phaseStats).forEach(([phaseId, stats]) => {
      phasePercentages[phaseId] = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
    });
    setPhaseProgress(phasePercentages);
    
    // Load study time
    const studyTimerHistory = localStorage.getItem('studyTimerHistory');
    if (studyTimerHistory) {
      try {
        const history = JSON.parse(studyTimerHistory);
        const totalSeconds = history.reduce((sum: number, session: any) => sum + session.totalSeconds, 0);
        setStudyTime(totalSeconds);
      } catch (e) {
        console.error('Failed to parse study time history', e);
      }
    }
  }, []);
  
  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Study Dashboard</h1>
      
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-muted-foreground text-sm font-medium">Overall Progress</div>
              <div className="text-4xl font-bold">{overallProgress}%</div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-muted-foreground text-sm font-medium">Current Phase</div>
              <div className="text-4xl font-bold">Phase 1</div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${phaseProgress.phase1 || 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-muted-foreground text-sm font-medium">Total Study Time</div>
              <div className="text-4xl font-bold">{formatTime(studyTime)}</div>
              <div className="text-xs text-muted-foreground">Tracked sessions</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-muted-foreground text-sm font-medium">Days to Exam</div>
              <div className="text-4xl font-bold">365</div>
              <div className="text-xs text-muted-foreground">Estimated</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              Tasks & Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/tracker">
              <Button variant="outline" className="w-full justify-between">
                <span>Study Tracker</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/custom-tasks">
              <Button variant="outline" className="w-full justify-between">
                <span>Custom Tasks</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Time Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/study-timer">
              <Button variant="outline" className="w-full justify-between">
                <span>Study Timer</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pomodoro">
              <Button variant="outline" className="w-full justify-between">
                <span>Pomodoro Timer</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Resources & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/stats">
              <Button variant="outline" className="w-full justify-between">
                <span>Statistics</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" className="w-full justify-between">
                <span>Academic Resources</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Phase Overview */}
      <Card>
        <CardHeader>
          <CardTitle>ISI MSQE Study Plan</CardTitle>
          <CardDescription>Overview of the four preparation phases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackerData.map((section, index) => {
              const phaseId = section.phase.split(':')[0].toLowerCase().replace(/\s+/g, '');
              const progressPercentage = phaseProgress[phaseId] || 0;
              
              return (
                <div key={phaseId} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{section.phase}</span>
                    <span className="text-sm">{progressPercentage}% Complete</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/tracker">
            <Button>
              View Detailed Tracker
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}