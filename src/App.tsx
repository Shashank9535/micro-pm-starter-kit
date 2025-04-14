
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import PRDBuilder from "./pages/tools/PRDBuilder";
import RoadmapBoard from "./pages/tools/RoadmapBoard";
import UserPersonas from "./pages/tools/UserPersonas";
import InterviewSurveyTemplates from "./pages/tools/InterviewSurveyTemplates";
import FeedbackInbox from "./pages/tools/FeedbackInbox";
import WeeklyCheckin from "./pages/tools/WeeklyCheckin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tools/prd-builder" element={<PRDBuilder />} />
          <Route path="/tools/roadmap-board" element={<RoadmapBoard />} />
          <Route path="/tools/user-personas" element={<UserPersonas />} />
          <Route path="/tools/interview-survey-templates" element={<InterviewSurveyTemplates />} />
          <Route path="/tools/feedback-inbox" element={<FeedbackInbox />} />
          <Route path="/tools/weekly-checkin" element={<WeeklyCheckin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
