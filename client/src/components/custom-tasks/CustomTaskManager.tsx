import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { PlusCircle, Trash2, CheckCircle2, Circle, Clock, Edit, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";

// Define the schema for a custom task
const customTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  phase: z.enum(["phase1", "phase2", "phase3", "phase4"]),
  createdAt: z.number(),
  completed: z.boolean().default(false),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

// Type for a custom task
type CustomTask = z.infer<typeof customTaskSchema>;

export default function CustomTaskManager() {
  // State for all tasks
  const [tasks, setTasks] = useState<CustomTask[]>(() => {
    const savedTasks = localStorage.getItem('customTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // State for filtered tasks (by completion status)
  const [filteredTasks, setFilteredTasks] = useState<CustomTask[]>([]);
  
  // State for the current filter tab
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed'>('all');
  
  // State for the form
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<CustomTask, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    phase: 'phase1',
    completed: false,
    priority: 'medium',
  });
  
  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('customTasks', JSON.stringify(tasks));
    
    // Apply filtering
    filterTasks(filterTab);
  }, [tasks]);
  
  // Filter tasks based on the active tab
  const filterTasks = (tab: 'all' | 'active' | 'completed') => {
    setFilterTab(tab);
    
    switch (tab) {
      case 'active':
        setFilteredTasks(tasks.filter(task => !task.completed));
        break;
      case 'completed':
        setFilteredTasks(tasks.filter(task => task.completed));
        break;
      default:
        setFilteredTasks([...tasks]);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      phase: 'phase1',
      completed: false,
      priority: 'medium',
    });
    setIsAdding(false);
    setIsEditing(null);
  };
  
  // Add a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate the form data
      const { title, description, phase, completed, priority } = formData;
      customTaskSchema.parse({
        id: '', // Will be generated
        title,
        description,
        phase,
        createdAt: 0, // Will be generated
        completed,
        priority,
      });
      
      // Generate a unique ID
      const id = `task-${Date.now()}`;
      
      // Create the new task
      const newTask: CustomTask = {
        id,
        title,
        description,
        phase,
        createdAt: Date.now(),
        completed,
        priority,
      };
      
      // Add it to the list
      setTasks(prev => [newTask, ...prev]);
      
      // Reset the form
      resetForm();
      
      // Show success message
      toast({
        title: "Task Added",
        description: "Your custom task has been added successfully.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map(e => e.message).join(", ");
        toast({
          title: "Invalid Form Data",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Update an existing task
  const updateTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditing) return;
    
    try {
      // Validate the form data
      const { title, description, phase, completed, priority } = formData;
      customTaskSchema.parse({
        id: isEditing,
        title,
        description,
        phase,
        createdAt: 0, // Will be updated
        completed,
        priority,
      });
      
      // Update the task
      setTasks(prev => prev.map(task => {
        if (task.id === isEditing) {
          return {
            ...task,
            title,
            description,
            phase,
            completed,
            priority,
          };
        }
        return task;
      }));
      
      // Reset the form
      resetForm();
      
      // Show success message
      toast({
        title: "Task Updated",
        description: "Your custom task has been updated successfully.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map(e => e.message).join(", ");
        toast({
          title: "Invalid Form Data",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Delete a task
  const deleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
      
      toast({
        title: "Task Deleted",
        description: "The task has been deleted successfully.",
      });
    }
  };
  
  // Toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };
  
  // Edit a task
  const editTask = (task: CustomTask) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      phase: task.phase,
      completed: task.completed,
      priority: task.priority,
    });
    setIsEditing(task.id);
    setIsAdding(true);
  };
  
  // Get phase name from ID
  const getPhaseName = (phaseId: string) => {
    switch(phaseId) {
      case 'phase1': return 'Phase 1: Foundation';
      case 'phase2': return 'Phase 2: Core Prep';
      case 'phase3': return 'Phase 3: Advanced Prep';
      case 'phase4': return 'Phase 4: Final Prep';
      default: return phaseId;
    }
  };
  
  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'low': return <Badge variant="outline" className="bg-green-100/10 text-green-600 border-green-600/20">Low</Badge>;
      case 'high': return <Badge variant="outline" className="bg-red-100/10 text-red-600 border-red-600/20">High</Badge>;
      default: return <Badge variant="outline" className="bg-yellow-100/10 text-yellow-600 border-yellow-600/20">Medium</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Custom Tasks</CardTitle>
              <CardDescription>Add your own tasks to study plan phases</CardDescription>
            </div>
            <Button 
              onClick={() => setIsAdding(!isAdding)} 
              variant={isAdding ? "outline" : "default"}
              size="sm"
            >
              {isAdding ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAdding && (
            <form onSubmit={isEditing ? updateTask : addTask} className="border rounded-md p-4 mb-6 bg-card/30">
              <h3 className="text-lg font-medium mb-4">{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title *</label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description (optional)"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phase" className="block text-sm font-medium mb-1">Phase</label>
                    <Select 
                      value={formData.phase} 
                      onValueChange={(value) => handleSelectChange('phase', value)}
                    >
                      <SelectTrigger id="phase">
                        <SelectValue placeholder="Select a phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase1">Phase 1: Foundation</SelectItem>
                        <SelectItem value="phase2">Phase 2: Core Prep</SelectItem>
                        <SelectItem value="phase3">Phase 3: Advanced Prep</SelectItem>
                        <SelectItem value="phase4">Phase 4: Final Prep</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority</label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value) => handleSelectChange('priority', value)}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="outline" type="button" onClick={resetForm}>Cancel</Button>
                  <Button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</Button>
                </div>
              </div>
            </form>
          )}
          
          <Tabs defaultValue="all" onValueChange={(value) => filterTasks(value as any)}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks found. Add a new task to get started.</p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onToggle={toggleTaskCompletion}
                    onEdit={editTask}
                    getPhaseName={getPhaseName}
                    getPriorityBadge={getPriorityBadge}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No active tasks found.</p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onToggle={toggleTaskCompletion}
                    onEdit={editTask}
                    getPhaseName={getPhaseName}
                    getPriorityBadge={getPriorityBadge}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No completed tasks found.</p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onDelete={deleteTask}
                    onToggle={toggleTaskCompletion}
                    onEdit={editTask}
                    getPhaseName={getPhaseName}
                    getPriorityBadge={getPriorityBadge}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// Component for individual task cards
interface TaskCardProps {
  task: CustomTask;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: CustomTask) => void;
  getPhaseName: (phaseId: string) => string;
  getPriorityBadge: (priority: string) => JSX.Element;
}

function TaskCard({ task, onDelete, onToggle, onEdit, getPhaseName, getPriorityBadge }: TaskCardProps) {
  // Format date from timestamp
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <Card className={`border-l-4 ${task.completed ? 'border-l-green-500' : 'border-l-primary'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button 
              onClick={() => onToggle(task.id)}
              className="mt-1 focus:outline-none"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-primary" />
              )}
            </button>
            
            <div>
              <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {getPhaseName(task.phase)}
                </Badge>
                
                {getPriorityBadge(task.priority)}
                
                <span className="text-xs text-muted-foreground inline-flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <Button 
              onClick={() => onEdit(task)} 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => onDelete(task.id)} 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}