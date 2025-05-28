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
import AdminVocab from "./pages/AdminVocab";
import AdminUser from "./pages/AdminUser";
import AdminTopic from "./pages/AdminTopic";
import Upgrade from "./pages/Upgrade";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLogin from "./pages/AdminLogin";
import { LearnedWordsProvider } from "@/contexts/LearnedWordsContext";
import LearnedWordsBox from "@/components/LearnedWordsBox"; // Import LearnedWordsBox
import LearningProgressPage from "./pages/learningprogress";

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
                {/* Các route public */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/Adminlogin" element={<AdminLogin />} />

                {/* Các route yêu cầu người dùng đã đăng nhập */}
                <Route element={<ProtectedRoute type="user" />}>
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route
                    path="/learn/topic/:topicId"
                    element={<TopicDetail />}
                  />
                  <Route path="/notebook" element={<Notebook />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/hub" element={<Hub />} />
                  <Route path="/review" element={<ReviewInterface />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/upgrade" element={<Upgrade />} />
                  <Route path="/learningprogress" element={<LearningProgressPage />} />
                </Route>
                {/* Các route dành riêng cho admin */}
                <Route element={<ProtectedRoute type="admin" />}>
                  <Route path="/admin" element={<Admin />}>
                    {/* Các route con của admin */}
                    <Route
                      index
                      element={
                        <>
                          <h1 className="text-2xl font-bold">
                            Welcome to the Admin Panel
                          </h1>
                          <p className="text-gray-600 mt-4">
                            Use the navigation menu to manage users, vocabulary,
                            and topics.
                          </p>
                        </>
                      }
                    />
                    <Route path="users" element={<AdminUser />} />
                    <Route path="vocabulary" element={<AdminVocab />} />
                    <Route path="topics" element={<AdminTopic />} />
                  </Route>
                </Route>
                {/* Not found */}
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
