import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "@/components/layout/AppLayout";
import NotFound from "@/pages/not-found";
import ISITracker from "@/pages/ISITracker";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import StudyTimerPage from "@/pages/StudyTimerPage";
import PomodoroTimerPage from "@/pages/PomodoroTimerPage";
import CustomTasksPage from "@/pages/CustomTasksPage";
import StatsPage from "@/pages/StatsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SchedulePage from "@/pages/SchedulePage";

// Simple router that separates the landing page from the app layout pages
function Router() {
  return (
    <Switch>
      {/* Landing page - no layout */}
      <Route path="/" component={Home} />
      
      {/* App pages with layout */}
      <Route path="/dashboard">
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </Route>
      
      <Route path="/tracker">
        <AppLayout>
          <ISITracker />
        </AppLayout>
      </Route>
      
      <Route path="/custom-tasks">
        <AppLayout>
          <CustomTasksPage />
        </AppLayout>
      </Route>
      
      <Route path="/study-timer">
        <AppLayout>
          <StudyTimerPage />
        </AppLayout>
      </Route>
      
      <Route path="/pomodoro">
        <AppLayout>
          <PomodoroTimerPage />
        </AppLayout>
      </Route>
      
      <Route path="/stats">
        <AppLayout>
          <StatsPage />
        </AppLayout>
      </Route>
      
      <Route path="/resources">
        <AppLayout>
          <ResourcesPage />
        </AppLayout>
      </Route>
      
      <Route path="/schedule">
        <AppLayout>
          <SchedulePage />
        </AppLayout>
      </Route>
      
      {/* 404 route */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
