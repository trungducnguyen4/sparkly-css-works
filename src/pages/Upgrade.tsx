import React from 'react';
import NavBar from '../components/NavBar';

const Upgrade = () => {
    const handleUpgrade = async () => {
        try {
            const orderId = '12345'; // Replace with a unique order ID
            const amount = 10000; // Replace with the desired amount in VND

            const response = await fetch(
                `http://localhost:9090/api/vnpay/create-payment?orderId=${orderId}&amount=${amount}`
            );

            if (response.ok) {
                const paymentUrl = await response.text(); // Backend returns the payment URL as plain text
                const timeout = setTimeout(() => {
                    alert('Không thể tải trang thanh toán. Vui lòng thử lại sau.');
                }, 10000); // 10-second timeout

                window.location.href = paymentUrl; // Redirect to VNPay payment page
                clearTimeout(timeout); // Clear timeout if redirection succeeds
            } else {
                console.error('Failed to create payment URL:', await response.text());
                alert('Không thể tạo liên kết thanh toán. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error('Error creating payment URL:', error);
            alert('Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
          <h1 className="text-2xl font-bold text-mochi-yellow mb-4">Nâng cấp lên Pro</h1>
          <p className="text-gray-700 mb-4">
            Trải nghiệm học tập không giới hạn với các khóa học Pro!
          </p>
          <ul className="text-left text-gray-600 mb-6">
            <li className="mb-2">✔️ Truy cập không giới hạn vào tất cả các khóa học</li>
            <li className="mb-2">✔️ Học từ vựng với các bài tập nâng cao</li>
            <li className="mb-2">✔️ Nhận hỗ trợ từ đội ngũ chuyên gia</li>
            <li className="mb-2">✔️ Không quảng cáo làm phiền</li>
            <li className="mb-2">✔️ Ưu đãi đặc biệt chỉ với <span className="font-bold text-mochi-yellow">10k</span>!</li>
          </ul>
          <button
            onClick={handleUpgrade}
            className="bg-mochi-yellow text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition"
          >
            Nâng cấp ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default Upgrade;