import { Navigate, useLocation } from 'react-router-dom';
import useCustomerStore from '../../stores/customerStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { customer, _hasHydrated } = useCustomerStore();
    const location = useLocation();

    if (!_hasHydrated) return null;

    if (!customer) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
