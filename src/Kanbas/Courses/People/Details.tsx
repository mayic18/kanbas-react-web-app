import { useEffect, useState } from "react";

import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
export default function PeopleDetails() {
  const {uid} = useParams();
  const [user, setUser] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const navigate = useNavigate();
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(user.firstName + " " + user.lastName);
    setEmail(user.email);
    setRole(user.role);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && (<div>
          <input className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>
            <span className="text-black fs-6">Email:</span><input className="form-control w-50 wd-edit-email" type="email"
            defaultValue={`${user.email}`}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>
          </div>)}
      </div>
      <b>Roles:</b>           {!editing && (<span className="wd-roles" onClick={() => setEditing(true)}>{user.role}</span>)}
                              {editing && (<select defaultValue={user.role} onChange={(e) => setRole(e.target.value)}
                                    className="form-select w-25 wd-select-role" >
                                    <option value="STUDENT">STUDENT</option>
                                    <option value="TA">TA</option> <option value="FACULTY">FACULTY</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>)}<br />
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
      </div> ); }