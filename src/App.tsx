import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import Learn from "./pages/Learn";
import Notebook from "./pages/Notebook";
import Chat from "./pages/Chat";
import Hub from "./pages/Hub";
import TopicDetail from "./pages/TopicDetail";
import NotFound from "./pages/NotFound";
import ReviewInterface from "@/components/ReviewInterface";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Upgrade from "./pages/Upgrade"; // Import the Upgrade component
import { LearnedWordsProvider } from "@/contexts/LearnedWordsContext";
import LearnedWordsBox from "@/components/LearnedWordsBox"; // Import LearnedWordsBox

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <LearnedWordsProvider>
                <>
                  <LearnedWordsBox /> {/* Add LearnedWordsBox */}
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/learn/topic/:topicId" element={<TopicDetail />} />
                    <Route path="/notebook" element={<Notebook />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/hub" element={<Hub />} />
                    <Route path="/review" element={<ReviewInterface />} />
                    <Route path="/upgrade" element={<Upgrade />} /> {/* Add Upgrade route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </>
              </LearnedWordsProvider>
            }
          />
          <Route path="/admin" element={<Admin />} /> {/* Exclude LearnedWordsBox */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
