import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Gửi yêu cầu gửi mã xác nhận về email
      const res = await fetch("http://localhost:9090/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        let message = "";
        try {
          const data = await res.json();
          message = data.message || JSON.stringify(data);
        } catch {
          message = await res.text();
        }
        throw new Error(message || "Gửi email thất bại");
      }
      // Thông báo và chuyển hướng về trang đăng nhập
      alert("Mã xác nhận đã được gửi về email của bạn. Vui lòng kiểm tra hộp thư.");
      navigate("/login");
    } catch (err: any) {
      // Hiển thị lỗi chi tiết hơn
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Không thể kết nối tới máy chủ. Vui lòng kiểm tra lại API hoặc kết nối mạng.");
      } else {
        setError(err.message || String(err));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Quên mật khẩu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Nhập email để nhận mã xác nhận
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full py-2">
            Gửi mã xác nhận
          </Button>
          <div className="text-center mt-2">
            <button
              type="button"
              className="text-blue-500 underline text-sm"
              onClick={() => navigate("/login")}
            >
              Quay lại đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
