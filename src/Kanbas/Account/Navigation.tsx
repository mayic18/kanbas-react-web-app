import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  const { pathname } = useLocation();
  return (
    <div className="wd list-group fs-5 rounded-0" id="wd-account-navigation">
      <Link to={`/Kanbas/Account/Signin`} className="list-group-item active border border-0"  > Signin  </Link> 
      <Link to={`/Kanbas/Account/Signup`}  className="list-group-item text-danger border border-0" > Signup  </Link> 
      <Link to={`/Kanbas/Account/Profile`}  className="list-group-item text-danger border border-0"> Profile </Link> 
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}

    </div>
);}
