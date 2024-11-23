import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import AssignmentsControl from "./AssignmentsControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsItemControl from "./AssignmetsItemControl";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { RootState } from "../../store";
import * as db from "../../Database";
import { Assignment } from "./types";
import { setAssignment, addAssignment, deleteAssignment } from "./reducer";
import { useState, useEffect } from "react";
import * as assignmentsClient from "./client";
import * as coursesClient from '../client'

export default function Assignments() {
  const { cid, aid } = useParams();
  const assignmentsData = useSelector((state: RootState) => state.assignments.assignments) as Assignment[];
  const courses = db.courses;
  const dispatch = useDispatch();
  const filteredAssignments = assignmentsData;
  const currentCourse = courses.find(course => course._id === cid);
  const [showDialog, setShowDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteAssignment = (assignmentId: string) => {
    dispatch(deleteAssignment(assignmentId));
  };

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDialog(true); // Open the dialog
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
      setShowDialog(false);
      setAssignmentToDelete(null); // Clear the assignment ID
    }
  };

  const cancelDelete = () => {
    setShowDialog(false); // Close the dialog without deleting
    setAssignmentToDelete(null);
  };

  

  const removeAssignments = async (assignment: {_id : string}) => {
    await assignmentsClient.deleteAssignment(assignment._id);
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
      setShowDialog(false);
      setAssignmentToDelete(null); 
    }
  };

  

  const fetchAssignments = async () => {
    try {
      const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
      dispatch(setAssignment(assignments));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, []);



  return (
    <div className="wd-main-content-offset" id="wd-assignments" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <AssignmentsControl /><br /><br />

      <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <MdAssignment className="me-2 fs-3" />
          ASSIGNMENTS
          <span style={{ fontSize: '16px', color: 'dark' }} className="ms-auto me-3">40% of Total</span>
          <AssignmentControlButtons />
        </div>
        <ul className="wd-lesson list list-group rounded-0">
          {filteredAssignments.map((assignment) => (
            <li key={assignment._id} className="wd-lesson list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center">
                <BsGripVertical className="me-3 fs-3" />
                <MdAssignment style={{ color: 'red', fontSize: '18px' }} className="fs-3 me-4" />
                <Link to={`/Kanbas/Courses/${cid}/AssignmentEditor/${assignment._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="flex-fill" style={{ lineHeight: '1', wordSpacing: '2.5px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{assignment.title}</span><br />
                    <span style={{ fontSize: '14px', color: 'red' }}>Multiple Modules |</span>
                    <span style={{ fontSize: '14px', color: 'dark' }}>
                      <b>Due</b> {assignment.dueDate || (currentCourse ? currentCourse.endDate : 'TBD')} | {assignment.points} pts
                    </span>
                  </div>
                </Link>
              </div>

              <AssignmentsItemControl
                assignmentId={assignment._id}
                deleteAssignment={() => handleDeleteClick(assignment._id)}
              />
            </li>
          ))}
        </ul>
      </li>

      {showDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Are you sure you want to delete this assignment?</h4>
            
              <button
                onClick={confirmDelete}
                className="btn btn-danger me-2">
                Yes
              </button>
      
            <button onClick={cancelDelete} className="btn btn-secondary">No</button>
          </div>
        </div>
      )}
    </div>
  );
}