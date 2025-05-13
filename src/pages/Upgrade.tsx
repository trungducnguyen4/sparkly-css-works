import React from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios'; // Import Axios

const Upgrade = () => {
    const handleUpgrade = async (plan: string) => {
        try {
            const userId = 1; // Replace with the actual user ID from your authentication context or state
            const payload = {
                userId,
                subscriptionType: plan,
            };

            const response = await axios.post('http://localhost:9090/api/premium/add', payload);

            if (response.status === 200) {
                alert(response.data); // Display success message from the backend
            } else {
                console.error('Failed to add premium:', response.data);
                alert('Không thể nâng cấp gói. Vui lòng thử lại sau.');
            }
        } catch (error) {
            console.error('Error adding premium:', error);
            alert('Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                    <h1 className="text-2xl font-bold text-mochi-yellow mb-4">Chọn gói nâng cấp</h1>
                    <p className="text-gray-700 mb-4">
                        Trải nghiệm học tập không giới hạn với các gói nâng cấp!
                    </p>
                    <div className="space-y-6">
                        {/* Trial Plan */}
                        <div className="border rounded-lg p-4 text-left">
                            <h2 className="text-xl font-bold text-gray-800">Trial - 7 ngày</h2>
                            <p className="text-gray-600 mb-2">✔️ Truy cập miễn phí trong 7 ngày</p>
                            <p className="text-gray-600 mb-4">✔️ Trải nghiệm các tính năng cơ bản</p>
                            <button
                                onClick={() => handleUpgrade('trial')}
                                className="bg-mochi-yellow text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition"
                            >
                                Chọn gói Trial
                            </button>
                        </div>

                        {/* Gold Plan */}
                        <div className="border rounded-lg p-4 text-left">
                            <h2 className="text-xl font-bold text-gray-800">Gold - 30 ngày</h2>
                            <p className="text-gray-600 mb-2">✔️ Truy cập không giới hạn trong 30 ngày</p>
                            <p className="text-gray-600 mb-4">✔️ Học từ vựng với bài tập nâng cao</p>
                            <button
                                onClick={() => handleUpgrade('gold')}
                                className="bg-mochi-yellow text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition"
                            >
                                Chọn gói Gold
                            </button>
                        </div>

                        {/* Diamond Plan */}
                        <div className="border rounded-lg p-4 text-left">
                            <h2 className="text-xl font-bold text-gray-800">Diamond - 90 ngày</h2>
                            <p className="text-gray-600 mb-2">✔️ Truy cập không giới hạn trong 90 ngày</p>
                            <p className="text-gray-600 mb-4">✔️ Nhận hỗ trợ từ đội ngũ chuyên gia</p>
                            <button
                                onClick={() => handleUpgrade('diamond')}
                                className="bg-mochi-yellow text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition"
                            >
                                Chọn gói Diamond
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upgrade;