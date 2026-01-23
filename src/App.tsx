import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "@/store/appStore";

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

const AppRoutes = () => {
  const { userProfile } = useAppStore();
  const onboardingComplete = userProfile?.onboardingComplete;

  return (
    <Routes>
      {/* Redirect root based on onboarding status */}
      <Route 
        path="/" 
        element={
          onboardingComplete 
            ? <Navigate to="/home" replace /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      
      {/* Onboarding routes */}
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/onboarding/age" element={<ChildAge />} />
      <Route path="/onboarding/caregiver" element={<CaregiverTypePage />} />
      <Route path="/onboarding/confidence" element={<Confidence />} />
      
      {/* Main app routes */}
      <Route 
        path="/home" 
        element={
          onboardingComplete 
            ? <Home /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      <Route 
        path="/tracker" 
        element={
          onboardingComplete 
            ? <SignalTracker /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      <Route 
        path="/insight" 
        element={
          onboardingComplete 
            ? <DailyInsight /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      <Route 
        path="/insight-history" 
        element={
          onboardingComplete 
            ? <InsightHistory /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      <Route 
        path="/milestones" 
        element={
          onboardingComplete 
            ? <Milestones /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      <Route 
        path="/lessons" 
        element={
          onboardingComplete 
            ? <MicroLessons /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      <Route 
        path="/reflection" 
        element={
          onboardingComplete 
            ? <WeeklyReflection /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      <Route 
        path="/export" 
        element={
          onboardingComplete 
            ? <Export /> 
            : <Navigate to="/welcome" replace />
        } 
      />
      
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
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
