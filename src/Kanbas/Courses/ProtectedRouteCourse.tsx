import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedRouteCourse({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();

  if (
    currentUser &&
    true
  ) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}