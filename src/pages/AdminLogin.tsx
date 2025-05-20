import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Nếu đã đăng nhập admin thì chuyển hướng về /admin
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const token = sessionStorage.getItem("adminToken");
    if (admin && token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    try {
      const response = await fetch("http://localhost:9090/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let message = "";
        try {
          const data = await response.json();
          message = data.message || JSON.stringify(data);
        } catch {
          message = await response.text();
        }
        throw new Error(message || "Login failed");
      }

      const data = await response.json();
      // Lưu thông tin admin vào localStorage/sessionStorage nếu cần
      localStorage.setItem("admin", JSON.stringify(data));
      sessionStorage.setItem("adminToken", data.token);

      // Chuyển hướng đến trang admin dashboard
      navigate("/admin"); // Đúng route về trang admin
    } catch (err: any) {
      setError(err.message || String(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập Admin</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full py-2">
            Đăng nhập
          </Button>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            className="text-blue-500 underline text-sm"
            onClick={() => navigate("/")}
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
