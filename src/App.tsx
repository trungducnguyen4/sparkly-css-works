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
import Admin from "./pages/Admin"; // Import the Admin component
import { LearnedWordsProvider } from "@/contexts/LearnedWordsContext";
import { PrivateRoute, AdminRoute } from "./components/ProtectedRoute";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LearnedWordsProvider>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
    <Route path="/practice" element={<PrivateRoute><Practice /></PrivateRoute>} />
    <Route path="/learn" element={<PrivateRoute><Learn /></PrivateRoute>} />
    <Route path="/learn/topic/:topicId" element={<PrivateRoute><TopicDetail /></PrivateRoute>} />
    <Route path="/notebook" element={<PrivateRoute><Notebook /></PrivateRoute>} />
    <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
    <Route path="/hub" element={<PrivateRoute><Hub /></PrivateRoute>} />
    <Route path="/review" element={<PrivateRoute><ReviewInterface /></PrivateRoute>} />

    {/* Route dành riêng cho admin */}
    <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />

    {/* Route không cần đăng nhập */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Route 404 */}
    <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
      </LearnedWordsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
