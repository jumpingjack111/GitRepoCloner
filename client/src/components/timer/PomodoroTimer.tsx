import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Timer, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}

export default function PomodoroTimer() {
  // Default settings
  const defaultSettings: PomodoroSettings = {
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    sessionsBeforeLongBreak: 4
  };
  
  // States
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  const [seconds, setSeconds] = useState(settings.workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [tempSettings, setTempSettings] = useState(settings);
  
  // Refs
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update timer when mode changes
  useEffect(() => {
    let duration = 0;
    
    switch (mode) {
      case 'work':
        duration = settings.workMinutes * 60;
        break;
      case 'shortBreak':
        duration = settings.shortBreakMinutes * 60;
        break;
      case 'longBreak':
        duration = settings.longBreakMinutes * 60;
        break;
    }
    
    setSeconds(duration);
    
    // Auto-save settings
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [mode, settings]);

  // Handle timer tick
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            // Timer finished
            clearInterval(intervalRef.current!);
            setIsActive(false);
            
            // Play sound
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.error("Failed to play sound:", e));
            }
            
            // Handle session completion
            if (mode === 'work') {
              const newCompletedSessions = completedSessions + 1;
              setCompletedSessions(newCompletedSessions);
              
              // Determine next break type
              if (newCompletedSessions % settings.sessionsBeforeLongBreak === 0) {
                setMode('longBreak');
              } else {
                setMode('shortBreak');
              }
            } else {
              // After break, go back to work
              setMode('work');
            }
            
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, mode, completedSessions, settings]);

  // Format seconds into MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    
    // Reset to current mode's time
    switch (mode) {
      case 'work':
        setSeconds(settings.workMinutes * 60);
        break;
      case 'shortBreak':
        setSeconds(settings.shortBreakMinutes * 60);
        break;
      case 'longBreak':
        setSeconds(settings.longBreakMinutes * 60);
        break;
    }
  };

  // Save settings
  const saveSettings = () => {
    setSettings(tempSettings);
  };

  // Get background color based on current mode
  const getModeBgColor = () => {
    switch (mode) {
      case 'work':
        return 'from-primary/20 to-primary/5';
      case 'shortBreak':
        return 'from-green-600/20 to-green-600/5';
      case 'longBreak':
        return 'from-blue-600/20 to-blue-600/5';
    }
  };

  return (
    <div className="mb-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pomodoro Timer</CardTitle>
              <CardDescription>Work efficiently with timed sessions</CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Pomodoro Settings</AlertDialogTitle>
                  <AlertDialogDescription>
                    Customize your pomodoro timer settings
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="workTime">Work Time: {tempSettings.workMinutes} min</Label>
                    <Slider 
                      id="workTime" 
                      min={5} 
                      max={60} 
                      step={5} 
                      value={[tempSettings.workMinutes]}
                      onValueChange={(value) => setTempSettings({...tempSettings, workMinutes: value[0]})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shortBreak">Short Break: {tempSettings.shortBreakMinutes} min</Label>
                    <Slider 
                      id="shortBreak" 
                      min={1} 
                      max={15} 
                      step={1}
                      value={[tempSettings.shortBreakMinutes]}
                      onValueChange={(value) => setTempSettings({...tempSettings, shortBreakMinutes: value[0]})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longBreak">Long Break: {tempSettings.longBreakMinutes} min</Label>
                    <Slider 
                      id="longBreak" 
                      min={5} 
                      max={30} 
                      step={5}
                      value={[tempSettings.longBreakMinutes]}
                      onValueChange={(value) => setTempSettings({...tempSettings, longBreakMinutes: value[0]})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessions">Sessions Before Long Break: {tempSettings.sessionsBeforeLongBreak}</Label>
                    <Slider 
                      id="sessions" 
                      min={2} 
                      max={6} 
                      step={1}
                      value={[tempSettings.sessionsBeforeLongBreak]}
                      onValueChange={(value) => setTempSettings({...tempSettings, sessionsBeforeLongBreak: value[0]})}
                    />
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setTempSettings(settings)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={saveSettings}>Save</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="work" value={mode} onValueChange={(value) => setMode(value as TimerMode)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
              <TabsTrigger value="longBreak">Long Break</TabsTrigger>
            </TabsList>
            
            <div className={`mt-6 p-6 rounded-lg bg-gradient-to-br ${getModeBgColor()}`}>
              <div className="text-7xl font-bold text-center py-8 tabular-nums">
                {formatTime(seconds)}
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={toggleTimer} 
                  variant={isActive ? "outline" : "default"}
                  size="lg"
                  className="w-32"
                >
                  {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isActive ? 'Pause' : 'Start'}
                </Button>
                
                <Button 
                  onClick={resetTimer} 
                  variant="outline"
                  size="lg"
                  className="w-32"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  <Timer className="inline-block mr-1 h-4 w-4" />
                  {completedSessions} work sessions completed
                </p>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}