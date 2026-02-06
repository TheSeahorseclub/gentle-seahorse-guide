import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useCurrentChild } from "@/hooks/useCurrentChild";

// Auth
import { Auth } from "./pages/Auth";

// Onboarding
import { Welcome } from "./pages/onboarding/Welcome";
import { ChildAge } from "./pages/onboarding/ChildAge";
import { CaregiverTypePage } from "./pages/onboarding/CaregiverType";
import { Confidence } from "./pages/onboarding/Confidence";

// Main app
import { Home } from "./pages/Home";
import { SignalTracker } from "./pages/SignalTracker";
import { DailyInsight } from "./pages/DailyInsight";
import { InsightHistory } from "./pages/InsightHistory";
import { Milestones } from "./pages/Milestones";
import { MicroLessons } from "./pages/MicroLessons";
import { WeeklyReflection } from "./pages/WeeklyReflection";
import { Export } from "./pages/Export";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper that requires authentication
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen gradient-calm flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h2 className="font-display text-xl text-foreground mb-2">The Seahorse Club</h2>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const LoadingScreen = () => (
  <div className="min-h-screen gradient-calm flex items-center justify-center">
    <div className="text-center animate-fade-in">
      <h2 className="font-display text-xl text-foreground mb-2">The Seahorse Club</h2>
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: currentChild, isLoading: childLoading } = useCurrentChild();
  const onboardingComplete = !!currentChild;

  if (authLoading || (user && childLoading)) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Root redirect */}
      <Route 
        path="/" 
        element={
          !user 
            ? <Navigate to="/auth" replace />
            : onboardingComplete 
              ? <Navigate to="/home" replace /> 
              : <Navigate to="/welcome" replace />
        } 
      />

      {/* Auth route */}
      <Route path="/auth" element={
        user ? <Navigate to={onboardingComplete ? "/home" : "/welcome"} replace /> : <Auth />
      } />
      
      {/* Onboarding routes (require auth) */}
      <Route path="/welcome" element={
        <RequireAuth><Welcome /></RequireAuth>
      } />
      <Route path="/onboarding/age" element={
        <RequireAuth><ChildAge /></RequireAuth>
      } />
      <Route path="/onboarding/caregiver" element={
        <RequireAuth><CaregiverTypePage /></RequireAuth>
      } />
      <Route path="/onboarding/confidence" element={
        <RequireAuth><Confidence /></RequireAuth>
      } />
      
      {/* Main app routes (require auth + onboarding) */}
      <Route path="/home" element={
        <RequireAuth>
          {onboardingComplete ? <Home /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      <Route path="/tracker" element={
        <RequireAuth>
          {onboardingComplete ? <SignalTracker /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      <Route path="/insight" element={
        <RequireAuth>
          {onboardingComplete ? <DailyInsight /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      <Route path="/insight-history" element={
        <RequireAuth>
          {onboardingComplete ? <InsightHistory /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      <Route path="/milestones" element={
        <RequireAuth>
          {onboardingComplete ? <Milestones /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      <Route path="/lessons" element={
        <RequireAuth>
          {onboardingComplete ? <MicroLessons /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      <Route path="/reflection" element={
        <RequireAuth>
          {onboardingComplete ? <WeeklyReflection /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      <Route path="/export" element={
        <RequireAuth>
          {onboardingComplete ? <Export /> : <Navigate to="/welcome" replace />}
        </RequireAuth>
      } />
      
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
