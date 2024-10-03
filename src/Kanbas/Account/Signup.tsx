import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input className="form-control " placeholder="username" />
      <input className="form-control " placeholder="password" type="password" />
      
      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100 mb-2"> Sign up </Link>
      <Link to="/Kanbas/Account/Signin" >Sign in</Link>
    </div>
);}
