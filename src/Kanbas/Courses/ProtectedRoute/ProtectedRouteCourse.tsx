import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedRouteCourse({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (
    currentUser &&
    true
  ) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}