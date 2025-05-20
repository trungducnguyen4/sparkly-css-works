import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
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
import AdminVocab from "./pages/AdminVocab"; // Import AdminVocab
import AdminUser from "./pages/AdminUser"; // Import AdminUser
import AdminTopic from "./pages/AdminTopic"; // Import AdminTopic
import Upgrade from "./pages/Upgrade"; // Import the Upgrade component
import Profile from "./pages/Profile"; // Import Profile
import ForgotPassword from "./pages/ForgotPassword"; // Import ForgotPassword
import ResetPassword from "./pages/ResetPassword"; // Import ResetPassword
import AdminLogin from "./pages/AdminLogin"; // Import AdminLogin
import { LearnedWordsProvider } from "@/contexts/LearnedWordsContext";
import LearnedWordsBox from "@/components/LearnedWordsBox"; // Import LearnedWordsBox

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
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
                <Route path="/upgrade" element={<Upgrade />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/Adminlogin" element={<AdminLogin />} /> {/* Đúng route: /Adminlogin */}
                <Route path="/admin" element={<Admin />} /> {/* Thêm lại route cho trang admin */}
                {/* Route cho user */}
                <Route element={<ProtectedRoute type="user" />}>
                  <Route path="/learn" element={<Learn />} />
                  {/* các route user khác */}
                </Route>

                {/* Route cho admin */}
                <Route element={<ProtectedRoute type="admin" />}>
                  <Route path="/admin" element={<Admin />} />
                  {/* các route admin khác */}
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          </LearnedWordsProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
