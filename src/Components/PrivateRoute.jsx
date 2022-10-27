import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, hasAccess }) {
    return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
