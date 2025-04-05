import { useEffect } from 'react';
import { Calendar, ClockIcon } from 'lucide-react';

import StudySessionManager from '@/components/schedule/StudySessionManager';

export default function SchedulePage() {
  // Request notification permission when the page loads
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    // Set document title
    document.title = "Study Schedule | ISI MSQE Study Tracker";
    
    return () => {
      document.title = "ISI MSQE Study Tracker";
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Study Schedule</h2>
        <p className="text-muted-foreground">
          Plan your study sessions, set objectives tied to specific phases, and get reminders when it's time to study.
        </p>
      </div>
      
      <StudySessionManager />
    </div>
  );
}