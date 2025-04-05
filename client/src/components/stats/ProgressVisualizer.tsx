import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';

// Define types for statistics
interface PhaseStats {
  id: string;
  name: string;
  completed: number;
  total: number;
  percentage: number;
}

interface TimeStats {
  date: string;
  minutes: number;
  subject?: string;
}

interface ChartData {
  phases: PhaseStats[];
  timeByDay: TimeStats[];
  timeBySubject: { name: string; value: number }[];
}

export default function ProgressVisualizer() {
  // Sample data - in a real app, this would come from props or context
  const [statsData] = useState<ChartData>({
    phases: [
      { id: "phase1", name: "Foundation", completed: 8, total: 10, percentage: 80 },
      { id: "phase2", name: "Core Prep", completed: 6, total: 12, percentage: 50 },
      { id: "phase3", name: "Advanced Prep", completed: 3, total: 15, percentage: 20 },
      { id: "phase4", name: "Final Prep", completed: 1, total: 8, percentage: 12.5 }
    ],
    timeByDay: [
      { date: 'Mon', minutes: 120 },
      { date: 'Tue', minutes: 180 },
      { date: 'Wed', minutes: 150 },
      { date: 'Thu', minutes: 200 },
      { date: 'Fri', minutes: 160 },
      { date: 'Sat', minutes: 220 },
      { date: 'Sun', minutes: 90 }
    ],
    timeBySubject: [
      { name: 'Microeconomics', value: 240 },
      { name: 'Macroeconomics', value: 180 },
      { name: 'Statistics', value: 200 },
      { name: 'Mathematics', value: 350 },
      { name: 'Econometrics', value: 150 }
    ]
  });

  // Colors for the charts
  const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#4ade80', '#f97316'];
  
  // Convert minutes to hours and minutes for display
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Custom tooltip for time charts
  const TimeTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="font-medium">{payload[0].payload.date || payload[0].payload.name}</p>
          <p>{formatMinutes(payload[0].value)}</p>
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Statistics</CardTitle>
        <CardDescription>Visual representation of your study progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="progress">Completion Progress</TabsTrigger>
            <TabsTrigger value="time">Study Time</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
          </TabsList>
          
          {/* Completion Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Completion Percentage Chart */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">Completion by Phase</CardTitle>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statsData.phases}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="completed"
                        nameKey="name"
                      >
                        {statsData.phases.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              {/* Completion Bar Chart */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">Tasks by Phase</CardTitle>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={statsData.phases}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" fill="#8b5cf6" />
                      <Bar dataKey="total" name="Total Tasks" fill="#e2e8f0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Study Time Tab */}
          <TabsContent value="time" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time by Day Chart */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">Study Time by Day</CardTitle>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={statsData.timeByDay}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis
                        tickFormatter={(value) => `${Math.floor(value / 60)}h`}
                      />
                      <Tooltip content={<TimeTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="minutes" 
                        name="Study Time"
                        stroke="#8b5cf6" 
                        fill="#8b5cf6" 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              {/* Total Time Stats */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">Time Summary</CardTitle>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Total Study Time This Week</p>
                    <p className="text-3xl font-bold">
                      {formatMinutes(statsData.timeByDay.reduce((acc, day) => acc + day.minutes, 0))}
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Average Daily Study Time</p>
                    <p className="text-3xl font-bold">
                      {formatMinutes(
                        Math.round(
                          statsData.timeByDay.reduce((acc, day) => acc + day.minutes, 0) / 
                          statsData.timeByDay.length
                        )
                      )}
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Most Productive Day</p>
                    <p className="text-3xl font-bold">
                      {statsData.timeByDay.reduce((max, day) => max.minutes > day.minutes ? max : day, { date: '', minutes: 0 }).date}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time by Subject Chart */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">Time by Subject</CardTitle>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statsData.timeBySubject}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${formatMinutes(value)}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statsData.timeBySubject.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<TimeTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              {/* Subject Distribution Chart */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">Subject Distribution</CardTitle>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={statsData.timeBySubject}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number"
                        tickFormatter={(value) => `${Math.floor(value / 60)}h`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={80}
                      />
                      <Tooltip content={<TimeTooltip />} />
                      <Bar 
                        dataKey="value" 
                        name="Study Time" 
                        fill="#8b5cf6" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}