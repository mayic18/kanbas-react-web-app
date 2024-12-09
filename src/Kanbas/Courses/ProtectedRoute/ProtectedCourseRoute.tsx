import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function ProtectedCourseRoute({ children }: { children: JSX.Element }) {
  const { cid } = useParams(); 
  const { enrollments, role } = useSelector((state: RootState) => state.user.user);

  if (role === 'STUDENT' && !enrollments.includes(cid || '')) {
    return <Navigate to="/Kanbas/Dashboard" replace />;
  }

  return children;
}
