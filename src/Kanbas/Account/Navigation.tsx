import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div className="wd list-group fs-5 rounded-0" id="wd-account-navigation">
      <Link to={`/Kanbas/Account/Signin`} className="list-group-item active border border-0"  > Signin  </Link> 
      <Link to={`/Kanbas/Account/Signup`}  className="list-group-item text-danger border border-0" > Signup  </Link> 
      <Link to={`/Kanbas/Account/Profile`}  className="list-group-item text-danger border border-0"> Profile </Link> 
    </div>
);}
