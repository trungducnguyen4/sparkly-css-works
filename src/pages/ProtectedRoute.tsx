import { Navigate, Outlet, useLocation } from 'react-router-dom';

// type: 'user' | 'admin'
export const ProtectedRoute = ({ type = 'user' }: { type?: 'user' | 'admin' }) => {
    const location = useLocation();
    if (type === 'admin') {
        const adminToken = sessionStorage.getItem('adminToken');
        const admin = localStorage.getItem('admin');
        return (admin && adminToken)
            ? <Outlet />
            : <Navigate to="/adminlogin" state={{ from: location }} replace />;
    } else {
        const userToken = sessionStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        return (user && userToken)
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default ProtectedRoute;
