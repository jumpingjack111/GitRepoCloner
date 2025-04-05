import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Save } from "lucide-react";

interface TimerData {
  totalSeconds: number;
  subjectName: string;
  timestamp: number;
}

export default function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [timerHistory, setTimerHistory] = useState<TimerData[]>(() => {
    const savedHistory = localStorage.getItem('studyTimerHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  // Calculate total study time
  useEffect(() => {
    const total = timerHistory.reduce((sum, session) => sum + session.totalSeconds, 0);
    setTotalStudyTime(total);
  }, [timerHistory]);

  // Handle timer tick
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  // Save current session
  const saveSession = () => {
    if (seconds === 0) return;
    
    const sessionData: TimerData = {
      totalSeconds: seconds,
      subjectName: subjectName || 'Unnamed Session',
      timestamp: Date.now()
    };
    
    const newHistory = [...timerHistory, sessionData];
    setTimerHistory(newHistory);
    localStorage.setItem('studyTimerHistory', JSON.stringify(newHistory));
    
    // Reset after saving
    resetTimer();
    setSubjectName('');
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Study Timer</CardTitle>
          <CardDescription>Track your study sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Subject or topic name"
                className="w-full p-2 border rounded-md bg-card text-foreground"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </div>
            
            <div className="text-6xl font-bold text-center py-6 tabular-nums">
              {formatTime(seconds)}
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={toggleTimer} 
                variant={isActive ? "outline" : "default"}
                size="lg"
              >
                {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              
              <Button 
                onClick={resetTimer} 
                variant="outline"
                size="lg"
                disabled={seconds === 0}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              
              <Button 
                onClick={saveSession} 
                variant="default"
                size="lg"
                disabled={seconds === 0}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Recent Study Sessions</CardTitle>
          <CardDescription>Total study time: {formatTime(totalStudyTime)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {timerHistory.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No study sessions recorded yet</p>
            ) : (
              [...timerHistory]
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((session, index) => (
                  <div 
                    key={index} 
                    className="p-3 border rounded-md flex justify-between items-center bg-card/50"
                  >
                    <div>
                      <p className="font-medium">{session.subjectName}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(session.timestamp)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono">{formatTime(session.totalSeconds)}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}