

import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import * as db from "../../Database";
import { addAssignment } from "./reducer";



export default function AssignmentsControl() {
    const navigate = useNavigate();
    const { cid } = useParams();
    
    const handleAddAssignment = () => {
      navigate(`/Kanbas/Courses/${cid}/AssignmentEditor`); 
  };

    return (
        <div id="wd-assignments-controls" className="d-flex flex-wrap-nowrap text-nowrap justify-content-end">

            <div id="wd-search-bar" className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                
               />   
            </div>
            <div id="wd-collapse-all" className="text-nowrap">
                <button id="wd-collapse-all-btn" className="btn btn-white btn-lg  me-1 float-end text-black me-2" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group</button>
            </div>

            <button onClick={handleAddAssignment} type="button" id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment</button>
        </div>
    );
} 
