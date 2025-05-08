import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import { BookOpen, BarChart2, BookMarked, MessageSquare, User } from 'lucide-react';

const NavBar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.username) {
      setUsername(user.username); // Set the username
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <header className="w-full bg-white shadow-sm py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-mochi-yellow flex items-center">
            <span className="text-black">EZ</span>
            <span>VOCAB</span>
          </div>
        </Link>

        <nav className="hidden md:flex justify-center gap-8 flex-1">
          <Link to="/practice" className="nav-item">
            <BarChart2 className="h-5 w-5" />
            <span className="text-sm">Ôn tập</span>
          </Link>
          <Link to="/learn" className="nav-item">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm">Học từ mới</span>
          </Link>
          <Link to="/notebook" className="nav-item">
            <BookMarked className="h-5 w-5" />
            <span className="text-sm">Sổ tay</span>
          </Link>
          {/* <Link to="/chat" className="nav-item">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">Hội thoại</span>
          </Link>
          <Link to="/hub" className="nav-item">
            <User className="h-5 w-5" />
            <span className="text-sm">MochiHub</span>
          </Link> */}
          <Link to="/admin" className="nav-item">
            <span className="text-sm">Admin</span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="text-mochi-yellow font-semibold">
            {username || "Guest"} {/* Display username or fallback to "Guest" */}
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-mochi-yellow">
            <img 
              src="/placeholder.svg" 
              alt="User Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <Link 
            to="/upgrade" 
            className="bg-mochi-yellow text-white font-semibold py-1 px-3 rounded-md hover:bg-yellow-500 transition"
          >
            Nâng cấp lên Pro
          </Link>
          {/* Nút Đăng Xuất */}
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition"
          >
            Đăng Xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;