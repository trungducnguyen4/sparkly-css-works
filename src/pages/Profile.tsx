import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [totalWordsLearned, setTotalWordsLearned] = useState(0);
  const [premiumExpireDate, setPremiumExpireDate] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      setUsername(user.username || '');
      setTotalWordsLearned(user.totalWordsLearned || 0);
    }

    // Fetch premium expire date from premium controller by user id
    if (user && user.id) {
      fetch(`http://localhost:9090/api/premium/expire-date/${user.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPremiumExpireDate(data.expireDate || 'N/A');
        })
        .catch(() => setPremiumExpireDate('N/A'));
    } else {
      setPremiumExpireDate('N/A');
    }
  }, []);

  const handleSaveChanges = async () => {
    try {
      // Validate username is not empty
      if (!username || username.trim() === '') {
        alert('Username không được để trống.');
        return;
      }

      // Check if username already exists
      const checkResponse = await fetch(`http://localhost:9090/api/users/check-username?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });

      if (checkResponse.ok) {
        const isUsernameTaken = await checkResponse.json();
        if (isUsernameTaken) {
          alert('Username đã tồn tại. Vui lòng chọn username khác.');
          return;
        }
      } else {
        alert('Có lỗi xảy ra khi kiểm tra username.');
        return;
      }

      // Proceed with updating the username
      console.log('Cập nhật username:', username);
      const response = await fetch('http://localhost:9090/api/users/update-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem('user')).email,
          username,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result));
        alert('Cập nhật thông tin thành công!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        window.location.reload();
      } else {
        alert(`Lỗi: ${result.message}`);
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật thông tin.');
    }
  };
  

  const handleChangePassword = async () => {
    try {console.log('Đổi mật khẩu:', { oldPassword, newPassword, confirmPassword });

      const response = await fetch('http://localhost:9090/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem('user')).email,
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });

      if (response.ok) {
        alert('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const error = await response.json();
        alert(`Failed to change password: ${error.message}`);
      }
    } catch (error) {
      alert('An error occurred while changing the password.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block font-semibold mb-1">Total Words Learned</label>
          <input
            type="number"
            value={totalWordsLearned}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
        </div> */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Premium Expire Date</label>
          <input
            type="text"
            value={premiumExpireDate}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
        </div>
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Change Password</h2>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Old Password</label>
            <input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
