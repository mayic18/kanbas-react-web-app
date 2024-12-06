import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../store";
import * as assignmentsClient from "./client";
import { setAssignments } from "./reducer";
import { useEffect } from "react";
import { MdAssignment } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import { IoEllipsisVertical } from "react-icons/io5";
interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  availableDate: string;
  dueDate: string;
  availableUntil: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  // Retrieve assignments from the Redux store via assignmentsReducer
  const assignments = useSelector((state: RootState) =>
    state.assignmentReducer.assignments.filter((assignment: Assignment) => assignment.course === cid)
  );

  const fetchAssignments = async () => { 
    const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  }
  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    }
  };

  


  return (
    <div id="wd-assignments" className="container">
      <h3>Assignments for Course </h3>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group w-50">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            placeholder="Search for Assignments"
            className="form-control"
          />
        </div>
        {isFaculty && (
          <div>
            <button
              id="wd-add-assignment"
              className="btn btn-danger"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}
            >
              <FaPlus className="me-2" /> Assignment
            </button>
          </div>
        )}
      </div>
      
      <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          <TiArrowSortedDown className="me-2 fs-3" />
          <span className="me-auto">ASSIGNMENTS</span>
          <HiDotsVertical className="float-end fs-2" />
          <button type="button" className="btn btn-outline-secondary float-end">40% of Total</button>
        </div>

        <ul className="wd-lessons list-group rounded-0">
          {assignments.map((assignment:Assignment) => (
            <li key={assignment._id} className="wd-assignment-list-item list-group-item d-flex align-items-center mb-3">
              <BsGripVertical className="me-2 fs-3" />
              <MdAssignment className="me-2 fs-3" />
              <div className="flex-grow-1 mt-2">
                <Link
                  className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                >
                   <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{assignment.title}</span>
                   
                <p className="text-muted">
                  <span style={{ fontSize: '16px', color: 'red' }}>Multiple Modules |</span>
                  <span style={{ fontSize: '16px', color: 'black' }}>
                    <b>Due</b> {assignment.dueDate} || Not available until {assignment.availableDate} | {assignment.points} pts
                  </span>
                 
                </p>
                </Link>
              </div>
              <FaCheckCircle className="text-success me-3" />
              {isFaculty && (
                <FaTrash className="text-danger me-2 mb-1" onClick={() => handleDelete(assignment._id)} />
              )}
              <HiDotsVertical className="float-end fs-2" />
            </li>
          ))}
        </ul>
      </li>
    </div>
  );
}