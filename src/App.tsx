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
import ReviewInterface from "@/components/ReviewInterface"; // Import the ReviewInterface component
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upgrade from "./pages/Upgrade";
import Admin from "./pages/Admin";
import React from "react";
import LearnedWordsBox from "./components/LearnedWordsBox";
import { LearnedWordsProvider } from "@/contexts/LearnedWordsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LearnedWordsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/register" element={<Register />} /> {/* Register route */}
            <Route path="/practice" element={<Practice />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/topic/:topicId" element={<TopicDetail />} />
            <Route path="/notebook" element={<Notebook />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/review" element={<ReviewInterface />} /> {/* Register the ReviewInterface route */}
            <Route path="/upgrade" element={<Upgrade />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <LearnedWordsBox />
      </LearnedWordsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
