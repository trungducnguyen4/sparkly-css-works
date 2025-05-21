import React, { useEffect }  from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const adminRaw = localStorage.getItem("admin");
    if (adminRaw) {
      try {
        const admin = JSON.parse(adminRaw);
        console.log(" Admin info:", admin);
      } catch (e) {
        console.error(" Lỗi khi parse thông tin admin:", e);
      }
    } else {
      console.warn(" Không tìm thấy thông tin admin trong localStorage.");
    }
  }, []);
   const handleLogout = () => {
    localStorage.removeItem("admin");
    sessionStorage.removeItem("adminToken");
    navigate("/adminlogin", { replace: true });
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 font-bold text-lg cursor-pointer " onClick={() => navigate("/admin")}>Admin Panel</div>
        <nav className="space-y-2">
          <button
            onClick={() => navigate("/admin/users")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Quản lý người dùng
          </button>
          <button
            onClick={() => navigate("/admin/vocabulary")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Quản lý từ vựng
          </button>
          <button
            onClick={() => navigate("/admin/topics")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Quản lý chủ đề
          </button>
        </nav>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Đăng xuất
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">
       
        <Outlet /> {/* 👈 Phần nội dung route con sẽ được render ở đây */}
      </main>
    </div>
  );
};

export default Admin;