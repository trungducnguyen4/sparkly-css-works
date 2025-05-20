import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Custom hook để kiểm tra đăng nhập cho user
export function useRequireUserAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = sessionStorage.getItem("authToken");
    if (!user || !token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
}

// Custom hook để kiểm tra đăng nhập cho admin
export function useRequireAdminAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const token = sessionStorage.getItem("adminToken"); // Sửa lại key ở đây
    if (!admin || !token) {
      navigate("/adminlogin", { replace: true });
    }
  }, [navigate]);
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Nếu đã đăng nhập user thì chuyển hướng về trang chủ
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = sessionStorage.getItem("authToken");
    if (user && token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Log email and password for debugging
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Backend Error (JSON):", errorData); // Log JSON error
          throw new Error(errorData.message || "Login failed");
        } else {
          const errorText = await response.text();
          console.error("Backend Error (Text):", errorText); // Log text error
          throw new Error(errorText || "Login failed");
        }
      }

      const data = await response.json();
      console.log("Backend response:", data); // Debug log to inspect the backend response

      // Save login information to localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Save the auth token to sessionStorage
      sessionStorage.setItem("authToken", data.token);

      // Navigate to the home page on successful login
      navigate("/");
    } catch (err: any) {
      console.error("Login Error:", err); // Log the error
      setError(err.message); // Display the error message in the UI
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
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
          <div className="text-right mt-2">
            <button
              type="button"
              className="text-blue-500 underline text-sm"
              onClick={() => navigate("/forgot-password")}
            >
              Quên mật khẩu?
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Chưa có tài khoản?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 underline"
          >
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;