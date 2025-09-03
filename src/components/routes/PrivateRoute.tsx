import type { PropsWithChildren } from "react";
import { useUser } from "../../contexts/UserContext";
import { Navigate } from "react-router";

function PrivateRoute({ children }: PropsWithChildren) {
  const { currentUser } = useUser();
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return
  <> 
    { children }
  </>
}
export default PrivateRoute;