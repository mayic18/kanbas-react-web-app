import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from 'react-icons/bs';
import AssignmentsControl from "./AssignmentsControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdAssignment  } from 'react-icons/md';
import AssignmentsItemControl from "./AssignmetsItemControl";
import { FaChevronDown } from 'react-icons/fa';

export default function Assignments() {
  return (
    <div className="wd-main-content-offset" id="wd-assignments" style={{fontFamily:'Arial, Helvetica, sans-serif'}}>
      <AssignmentsControl /><br /><br />

      <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center" >
          <BsGripVertical className="me-2 fs-3" />
          <FaChevronDown className="me-2 fs-10"/>
          ASSIGNMENTS
          <span style={{ fontSize: '16px', color: 'dark' }} className="ms-auto me-3">40% of Total</span>
          <AssignmentControlButtons />
        </div>
        <ul className="wd-lesson list list-group rounded-0" >
          <a href="#/Kanbas/Courses/1234/Assignments/123" style={{ textDecoration: 'none', color: 'inherit'}}>
          <li className="wd-lesson list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
            <BsGripVertical className="me-3 fs-3" />
            <MdAssignment style={{ color: 'red', fontSize: '18px' }} className="fs-3 me-4" />
            <div className="flex-fill " style={{ lineHeight: '1', wordSpacing: '2.5px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>A1 - ENV + HTML</span><br />
              <span style={{ fontSize: '14px', color: 'red' }}>
               Multiple Modules |
              </span>
              <span style={{ fontSize: '14px', color: 'dark' }}>
                <b> Not available until</b> May 6 at 12:00am |
              </span><br />
              <span style={{ fontSize: '14px', color: 'dark' }}>
                <b>Due</b> May 13 at 11:59pm | 100pts
              </span>
            </div>
            <AssignmentsItemControl />
          </li>
          </a>
          <a href="#/Kanbas/Courses/1234/Assignments/124" style={{ textDecoration: 'none', color: 'inherit'}}>
          <li className="wd-lesson list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
          <BsGripVertical className="me-3 fs-3" />
            <MdAssignment style={{ color: 'red', fontSize: '18px' }} className="fs-3 me-4" />
            <div className="flex-fill " style={{ lineHeight: '1', wordSpacing: '2.5px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>A2 - CSS + BOOSTRAP</span><br />
              <span style={{ fontSize: '14px', color: 'red' }}>
               Multiple Modules |
              </span>
              <span style={{ fontSize: '14px', color: 'dark' }}>
                <b> Not available until</b> May 13 at 12:00am |
              </span><br />
              <span style={{ fontSize: '14px', color: 'dark' }}>
                <b>Due</b> May 20 at 11:59pm | 100pts
              </span>
            </div>
            <AssignmentsItemControl /></li></a>
            <a href="#/Kanbas/Courses/1234/Assignments/125" style={{ textDecoration: 'none', color: 'inherit'}}>
            <li className="wd-lesson list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
          <BsGripVertical className="me-3 fs-3" />
            <MdAssignment style={{ color: 'red', fontSize: '18px' }} className="fs-3 me-4" />
            <div className="flex-fill " style={{ lineHeight: '1', wordSpacing: '2.5px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>A3 - JAVASCRIPT + REACT</span><br />
              <span style={{ fontSize: '14px', color: 'red' }}>
               Multiple Modules |
              </span>
              <span style={{ fontSize: '14px', color: 'dark' }}>
                <b> Not available until</b> May 20 at 12:00am |
              </span><br />
              <span style={{ fontSize: '14px', color: 'dark' }}>
                <b>Due</b> May 27 at 11:59pm | 100pts
              </span>
            </div>
            <AssignmentsItemControl /></li></a>
          
        </ul>
      </li>

      </div>
  );
}

