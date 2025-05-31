import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios'; // Import Axios

const Upgrade = () => {
    // State cho VietQR
    const [bankId, setBankId] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [template, setTemplate] = useState('compact');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [accountName, setAccountName] = useState('');
    const [qrUrl, setQrUrl] = useState('');

    // Hàm tạo link VietQR
    const generateVietQR = (
        bankIdParam?: string,
        accountNoParam?: string,
        templateParam?: string,
        amountParam?: string,
        descriptionParam?: string,
        accountNameParam?: string
    ) => {
        const bId = bankIdParam ?? bankId;
        const accNo = accountNoParam ?? accountNo;
        const tmpl = templateParam ?? template;
        const amt = amountParam ?? amount;
        const desc = descriptionParam ?? description;
        const accName = accountNameParam ?? accountName;

        if (!bId || !accNo || !tmpl) {
            setQrUrl('');
            return;
        }
        const params = [
            amt ? `amount=${encodeURIComponent(amt)}` : '',
            desc ? `addInfo=${encodeURIComponent(desc)}` : '',
            accName ? `accountName=${encodeURIComponent(accName)}` : ''
        ].filter(Boolean).join('&');
        const url = `https://img.vietqr.io/image/${bId}-${accNo}-${tmpl}.png${params ? '?' + params : ''}`;
        setQrUrl(url);
    };

    // Cập nhật QR khi thay đổi thông tin form
    React.useEffect(() => {
        generateVietQR();
        // eslint-disable-next-line
    }, [bankId, accountNo, template, amount, description, accountName]);

    // Hàm xử lý khi bấm từng nút gói
    const handleShowTransferInfo = (plan: 'gold' | 'diamond') => {
        // Lấy username từ localStorage
        let username = "";
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            username = user.username || "";
        } catch {
            username = "";
        }

        // Lấy ngày hiện tại theo định dạng ddmmyyyy
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const dateStr = `${dd}${mm}${yyyy}`;

        // Thông tin mẫu mới: OCB, stk CASS1029804404
        let info = {
            bankId: '970448', // OCB
            accountNo: 'CASS1029804404',
            template: 'compact',
            amount: '',
            description: '',
            accountName: ''
        };
        if (plan === 'gold') {
            info = {
                ...info,
                amount: '2000',
                description: `Nang cap goi Gold ${username} ${dateStr}`,
            };
        } else if (plan === 'diamond') {
            info = {
                ...info,
                amount: '3000',
                description: `Nang cap goi Diamond ${username} ${dateStr}`,
            };
        }
        setBankId(info.bankId);
        setAccountNo(info.accountNo);
        setTemplate(info.template);
        setAmount(info.amount);
        setDescription(info.description);
        setAccountName(info.accountName);
    };

    // Hàm xác nhận thanh toán
    const checkPayment = async (expectedAmount: number) => {
        // Lấy username từ localStorage
        let username = "";
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            username = user.username || "";
        } catch {
            username = "";
        }

        // Lấy ngày hiện tại theo định dạng ddmmyyyy và yyyy-mm-dd
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const dateStr = `${dd}${mm}${yyyy}`;
        const todayStr = `${yyyy}-${mm}-${dd}`;

        try {
            const res = await fetch("https://script.google.com/macros/s/AKfycbzuIzrkovXBL_pvtE3x8o1Os1DMZQCakfKjBdJEJlEapVh8cfEtafoZXe100lAgiKFZ/exec");
            const data = await res.json();
            // Kiểm tra giao dịch khớp cả username và ngày trong mô tả và ngày giao dịch
            const found = data.data.find(
                (item: any) =>
                    item["Số tài khoản"] === "CASS1029804404" &&
                    Number(item["Giá trị"]) === expectedAmount &&
                    typeof item["Mô tả"] === "string" &&
                    (
                        item["Mô tả"].toLowerCase().includes(`nang cap goi gold ${username} ${dateStr}`.toLowerCase()) ||
                        item["Mô tả"].toLowerCase().includes(`nang cap goi diamond ${username} ${dateStr}`.toLowerCase())
                    ) &&
                    typeof item["Ngày diễn ra"] === "string" &&
                    item["Ngày diễn ra"].slice(0, 10) === todayStr
            );
            if (found) {
                // Gọi API backend để thêm user vào bảng premium với đúng payload
                try {
                    const user = JSON.parse(localStorage.getItem("user") || "{}");
                    if (!user.id) {
                        alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
                        return;
                    }

                    const payload = {
                        userId: user.id, // Lấy userId từ user object
                        subscriptionType: expectedAmount === 2000 ? "gold" : "diamond",
                    };

                    const response = await axios.post("http://localhost:9090/api/premium/add", payload, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.status === 200) {
                        alert(response.data); // Hiển thị thông báo thành công từ backend
                        window.location.href = "http://localhost:8081/learn";
                    } else {
                        alert("Không thể nâng cấp gói. Vui lòng thử lại sau.");
                    }
                } catch (err: any) {
                    console.error("Error:", err.response?.data || err.message);
                    alert("Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau.");
                }
            } else {
                alert("Chưa nhận được thanh toán đúng thông tin. Vui lòng kiểm tra lại nội dung chuyển khoản và thử lại sau vài phút.");
            }
        } catch (e) {
            alert("Lỗi kiểm tra thanh toán.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center md:w-[380px]">
                        <h1 className="text-2xl font-bold text-mochi-yellow mb-4">Chọn gói nâng cấp</h1>
                        <p className="text-gray-700 mb-4">
                            Trải nghiệm học tập không giới hạn với các gói nâng cấp!
                        </p>
                        <div className="space-y-6">
                            {/* Gold Plan */}
                            <div className="border rounded-lg p-4 text-left">
                                <h2 className="text-xl font-bold text-gray-800">Gold - 30 ngày</h2>
                                <p className="text-gray-600 mb-2">✔️ Truy cập không giới hạn trong 30 ngày</p>
                                <p className="text-gray-600 mb-4">✔️ Học từ vựng với bài tập nâng cao</p>
                                <button
                                    onClick={() => handleShowTransferInfo('gold')}
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
                                    onClick={() => handleShowTransferInfo('diamond')}
                                    className="bg-mochi-yellow text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition"
                                >
                                    Chọn gói Diamond
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Form tạo VietQR */}
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full md:w-[380px]">
                        <h2 className="text-xl font-bold text-mochi-yellow mb-4">Tạo mã VietQR</h2>
                        <div className="space-y-3">
                            <input
                                className="w-full border rounded px-3 py-2"
                                placeholder="Mã ngân hàng (ví dụ: 970436 hoặc Vietcombank)"
                                value={bankId}
                                onChange={e => setBankId(e.target.value)}
                                readOnly
                            />
                            <input
                                className="w-full border rounded px-3 py-2"
                                placeholder="Số tài khoản"
                                value={accountNo}
                                onChange={e => setAccountNo(e.target.value)}
                                readOnly
                            />
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={template}
                                onChange={e => setTemplate(e.target.value)}
                                disabled
                            >
                                <option value="compact">compact</option>
                                <option value="compact2">compact2</option>
                                <option value="qr_only">qr_only</option>
                                <option value="print">print</option>
                            </select>
                            <input
                                className="w-full border rounded px-3 py-2"
                                placeholder="Số tiền (tuỳ chọn)"
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                readOnly
                            />
                            <input
                                className="w-full border rounded px-3 py-2"
                                placeholder="Nội dung chuyển khoản (tuỳ chọn)"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                readOnly
                            />
                            <input
                                className="w-full border rounded px-3 py-2"
                                placeholder="Tên tài khoản (tuỳ chọn)"
                                value={accountName}
                                onChange={e => setAccountName(e.target.value)}
                            />
                            {/* Không cần nút tạo link nữa */}
                        </div>
                        {qrUrl && (
                            <div className="mt-6 text-center">
                                <img src={qrUrl} alt="VietQR" className="mx-auto mb-2" />
                                {/* <a href={qrUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-all">{qrUrl}</a> */}
                                {/* Nút xác nhận chuyển khoản */}
                                <button
                                    className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition"
                                    onClick={() => checkPayment(Number(amount))}
                                    disabled={!amount}
                                >
                                    Xác nhận đã chuyển khoản
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Upgrade;