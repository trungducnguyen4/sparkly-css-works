import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tokenFromUrl = query.get("token") || "";

  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Thiếu mã xác nhận (token).");
      return;
    }
    if (!password || password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9090/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        let message = "";
        try {
          const data = await res.json();
          message = data.message || JSON.stringify(data);
        } catch {
          message = await res.text();
        }
        throw new Error(message || "Đổi mật khẩu thất bại");
      }
      setSuccess(true);
    } catch (err: any) {
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
        <h2 className="text-2xl font-bold text-center mb-6">Đặt lại mật khẩu</h2>
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!tokenFromUrl && (
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                  Mã xác nhận (token)
                </label>
                <input
                  type="text"
                  id="token"
                  name="token"
                  required
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full py-2">
              Đặt lại mật khẩu
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
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">Đặt lại mật khẩu thành công!</p>
            <Button className="w-full py-2" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
