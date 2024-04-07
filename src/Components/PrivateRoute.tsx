import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProvateRouteProps {
  children: ReactNode;
  hasAccess: boolean;
}
function PrivateRoute({ children, hasAccess }: IProvateRouteProps) {
  return hasAccess ? children : <Navigate to={"/login"} />;
}

export default PrivateRoute;
