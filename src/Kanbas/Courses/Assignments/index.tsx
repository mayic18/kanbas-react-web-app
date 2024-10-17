import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from 'react-icons/bs';
import AssignmentsControl from "./AssignmentsControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdAssignment  } from 'react-icons/md';
import AssignmentsItemControl from "./AssignmetsItemControl";
import { FaChevronDown } from 'react-icons/fa';
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams(); 
  const assignmentsData = db.assignments; 
  const courses = db.courses;

  const filteredAssignments = assignmentsData.filter(assignment => assignment.course === cid);
  const currentCourse = courses.find(course => course._id === cid);

  return (
    <div className="wd-main-content-offset" id="wd-assignments" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <AssignmentsControl /><br /><br />

      <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center" >
          <BsGripVertical className="me-2 fs-3" />
          <MdAssignment className="me-2 fs-3" />
          ASSIGNMENTS
          <span style={{ fontSize: '16px', color: 'dark' }} className="ms-auto me-3">40% of Total</span>
          <AssignmentControlButtons />
        </div>
        <ul className="wd-lesson list list-group rounded-0">
          {filteredAssignments.map((assignment) => (
            <a key={assignment._id} href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <li className="wd-lesson list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                <BsGripVertical className="me-3 fs-3" />
                <MdAssignment style={{ color: 'red', fontSize: '18px' }} className="fs-3 me-4" />
                <div className="flex-fill" style={{ lineHeight: '1', wordSpacing: '2.5px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{assignment._id}</span><br />
                  <span style={{ fontSize: '14px', color: 'red' }}>
                    Multiple Modules |
                  </span>
                  <span style={{ fontSize: '14px', color: 'dark' }}>
                    <b>Due</b> {currentCourse ? currentCourse.endDate : 'TBD'} | 10 pts
                  </span>
                </div>
                <AssignmentsItemControl />
              </li>
            </a>
          ))}
        </ul>
      </li>
    </div>
  );
}

