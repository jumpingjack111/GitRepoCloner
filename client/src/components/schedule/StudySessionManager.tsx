import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addMinutes } from 'date-fns';
import { z } from 'zod';
import { CalendarIcon, Plus, BellRing, Clock, Check, X, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

import { generateId } from '@/lib/utils';
import { studySessionSchema, type StudySession } from '@shared/schema';
import { trackerData } from '@/lib/trackerData';

const formSchema = studySessionSchema.extend({
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  reminderTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Helper to transform form values to StudySession object
const formValuesToSession = (values: FormValues): StudySession => {
  return {
    ...values,
    id: values.id || generateId(),
    startDate: new Date(`${values.startDate}T${values.startTime}`),
    endDate: new Date(`${values.endDate}T${values.endTime}`),
    duration: calculateDuration(
      new Date(`${values.startDate}T${values.startTime}`),
      new Date(`${values.endDate}T${values.endTime}`)
    ),
    reminderTime: values.reminderEnabled && values.reminderTime 
      ? new Date(`${values.startDate}T${values.reminderTime}`) 
      : undefined,
  };
};

// Calculate duration in minutes between two dates
const calculateDuration = (start: Date, end: Date): number => {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
};

// Convert StudySession to form values
const sessionToFormValues = (session: StudySession): FormValues => {
  return {
    ...session,
    startDate: format(session.startDate, 'yyyy-MM-dd'),
    endDate: format(session.endDate, 'yyyy-MM-dd'),
    startTime: format(session.startDate, 'HH:mm'),
    endTime: format(session.endDate, 'HH:mm'),
    reminderTime: session.reminderTime ? format(session.reminderTime, 'HH:mm') : undefined,
  };
};

// For initial form state
const getDefaultValues = (): FormValues => {
  const now = new Date();
  const later = addMinutes(now, 60);
  
  return {
    title: '',
    phaseId: '',
    objective: '',
    startDate: format(now, 'yyyy-MM-dd'),
    endDate: format(now, 'yyyy-MM-dd'),
    startTime: format(now, 'HH:mm'),
    endTime: format(later, 'HH:mm'),
    duration: 60,
    reminderEnabled: false,
    reminderTime: format(addMinutes(now, -15), 'HH:mm'),
    notes: '',
    completed: false,
    createdAt: now,
  };
};

export default function StudySessionManager() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { toast } = useToast();

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  // Load sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('studySessions');
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions, (key, value) => {
          // Convert date strings back to Date objects
          if (key === 'startDate' || key === 'endDate' || key === 'reminderTime' || key === 'createdAt') {
            return value ? new Date(value) : value;
          }
          return value;
        });
        setSessions(parsedSessions);
      } catch (error) {
        console.error('Error parsing saved sessions:', error);
      }
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(sessions));
  }, [sessions]);

  // Check for active reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      sessions.forEach(session => {
        if (
          session.reminderEnabled && 
          session.reminderTime && 
          !session.completed && 
          Math.abs(now.getTime() - session.reminderTime.getTime()) < 60000 &&
          session.reminderTime.getTime() <= now.getTime()
        ) {
          // Show a reminder notification
          toast({
            title: '📚 Study Session Reminder',
            description: `Your session "${session.title}" is starting soon!`,
            duration: 10000,
          });
          
          // Try to send a notification if permission is granted
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Study Session Reminder', {
              body: `Your session "${session.title}" is starting soon!`,
              icon: '/favicon.ico',
            });
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Check immediately on load
    
    // Request notification permission on component mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    return () => clearInterval(intervalId);
  }, [sessions, toast]);

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const newSession = formValuesToSession(values);
    
    if (editingSession) {
      // Update existing session
      setSessions(prev => 
        prev.map(session => 
          session.id === editingSession ? newSession : session
        )
      );
      setEditingSession(null);
      toast({
        title: "Session updated",
        description: "Your study session has been updated successfully.",
      });
    } else {
      // Add new session
      setSessions(prev => [...prev, newSession]);
      toast({
        title: "Session scheduled",
        description: "Your study session has been scheduled successfully.",
      });
    }
    
    // Reset form
    form.reset(getDefaultValues());
  };

  // Edit a session
  const handleEdit = (id: string) => {
    const sessionToEdit = sessions.find(s => s.id === id);
    if (sessionToEdit) {
      setEditingSession(id);
      form.reset(sessionToFormValues(sessionToEdit));
    }
  };

  // Delete a session
  const handleDelete = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    if (editingSession === id) {
      setEditingSession(null);
      form.reset(getDefaultValues());
    }
    toast({
      title: "Session deleted",
      description: "Your study session has been deleted.",
    });
  };

  // Mark a session as completed
  const toggleCompleted = (id: string) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === id 
          ? { ...session, completed: !session.completed } 
          : session
      )
    );
  };

  // Filter sessions based on active tab
  const getFilteredSessions = () => {
    const now = new Date();
    if (activeTab === 'upcoming') {
      return sessions
        .filter(session => !session.completed && session.startDate >= now)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    } else if (activeTab === 'past') {
      return sessions
        .filter(session => session.completed || session.endDate < now)
        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    }
    return sessions.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  };

  // Get phase name by ID
  const getPhaseName = (phaseId: string) => {
    const phase = trackerData.find(phase => phase.id === phaseId);
    return phase ? phase.title : phaseId;
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingSession(null);
    form.reset(getDefaultValues());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Session form card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>{editingSession ? 'Edit Study Session' : 'Schedule a Study Session'}</CardTitle>
          <CardDescription>
            {editingSession 
              ? 'Update your scheduled study session details' 
              : 'Create a new scheduled study session with reminders'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Microeconomics Review" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phaseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Study Phase</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a phase" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trackerData.map(phase => (
                          <SelectItem key={phase.id} value={phase.id}>
                            {phase.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Objective</FormLabel>
                    <FormControl>
                      <Input placeholder="Complete 3 practice problems" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full flex justify-between items-center"
                            >
                              {field.value || "Select date"}
                              <CalendarIcon className="h-4 w-4 ml-2" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full flex justify-between items-center"
                            >
                              {field.value || "Select date"}
                              <CalendarIcon className="h-4 w-4 ml-2" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="reminderEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Enable Reminder
                      </FormLabel>
                      <FormDescription>
                        Get notified before the session starts
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {form.watch('reminderEnabled') && (
                <FormField
                  control={form.control}
                  name="reminderTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reminder Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormDescription>
                        Set a time to be reminded before your session starts
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes about this study session"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2">
                <Button type="submit">
                  {editingSession ? 'Update Session' : 'Schedule Session'}
                </Button>
                {editingSession && (
                  <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Session list card */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Study Sessions</CardTitle>
          <CardDescription>
            Manage your scheduled study sessions
          </CardDescription>
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getFilteredSessions().length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No sessions found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {activeTab === 'upcoming' 
                    ? 'You don\'t have any upcoming study sessions scheduled.' 
                    : activeTab === 'past'
                    ? 'You don\'t have any past study sessions.'
                    : 'You don\'t have any study sessions created yet.'}
                </p>
                {activeTab !== 'upcoming' && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setActiveTab('upcoming')}
                  >
                    View Upcoming
                  </Button>
                )}
              </div>
            ) : (
              getFilteredSessions().map((session) => (
                <Card key={session.id} className={session.completed ? 'bg-muted' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {session.title}
                          {session.completed && (
                            <Badge variant="outline" className="ml-2 text-green-500 border-green-500">
                              Completed
                            </Badge>
                          )}
                          {session.reminderEnabled && !session.completed && (
                            <Badge variant="outline" className="ml-2 text-blue-500 border-blue-500">
                              Reminder
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          <Badge variant="secondary" className="mr-2">
                            {getPhaseName(session.phaseId)}
                          </Badge>
                          {format(session.startDate, 'MMM d, yyyy')}
                          {' • '}
                          {format(session.startDate, 'h:mm a')} - {format(session.endDate, 'h:mm a')}
                          {' • '}
                          {session.duration} minutes
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleCompleted(session.id!)}
                          title={session.completed ? 'Mark as incomplete' : 'Mark as completed'}
                        >
                          {session.completed ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(session.id!)}
                          title="Edit session"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(session.id!)}
                          title="Delete session"
                          className="text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="mt-1">
                      <strong>Objective:</strong> {session.objective}
                    </div>
                    {session.notes && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        {session.notes}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {getFilteredSessions().length} {getFilteredSessions().length === 1 ? 'session' : 'sessions'} {activeTab === 'upcoming' ? 'scheduled' : activeTab === 'past' ? 'completed' : 'total'}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}