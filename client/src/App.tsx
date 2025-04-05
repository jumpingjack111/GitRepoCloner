import { Switch, Route, Redirect } from "wouter";
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

// Route that redirects to dashboard if accessed directly
const HomeRoute = () => <Redirect to="/dashboard" />;

// Routes that use the app layout
function AppRoutes() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/tracker" component={ISITracker} />
        <Route path="/custom-tasks" component={CustomTasksPage} />
        <Route path="/study-timer" component={StudyTimerPage} />
        <Route path="/pomodoro" component={PomodoroTimerPage} />
        <Route path="/stats" component={StatsPage} />
        <Route path="/resources" component={ResourcesPage} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/app" component={HomeRoute} />
      <Route path="/dashboard/*" component={AppRoutes} />
      <Route path="/tracker/*" component={AppRoutes} />
      <Route path="/custom-tasks/*" component={AppRoutes} />
      <Route path="/study-timer/*" component={AppRoutes} />
      <Route path="/pomodoro/*" component={AppRoutes} />
      <Route path="/stats/*" component={AppRoutes} />
      <Route path="/resources/*" component={AppRoutes} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
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
