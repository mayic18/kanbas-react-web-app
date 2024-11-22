import { Link } from "react-router-dom";

import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { enrollInCourse, unenrollFromCourse } from './Enrollments/reducer';
import * as enrollmentsClient from './Enrollments/clients'

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {
  const dispatch = useDispatch();
  const { role, enrollments } = useSelector((state: RootState) => state.user.user);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const toggleEnrollmentsView = () => setShowAllCourses(!showAllCourses);
  const isEnrolled = (courseId: string) => enrollments.includes(courseId);
  const handleEnroll = (courseId: string) => {
    dispatch(enrollInCourse(courseId));
  };
  const removeEnrollment = async (userId: string, courseId: string) => {
    await enrollmentsClient.deleteEnrollment(userId, courseId);
    dispatch((unenrollFromCourse({ courseId })));
  };

  const addErollments = async (userId: string, courseId: string) => {
    await enrollmentsClient.addEnrollment(userId, courseId);
    dispatch((enrollInCourse({ courseId })));
  };
  const displayedCourses = courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {role === 'FACULTY' && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={updateCourse}>
              Update
            </button>
          </h5>
          <input value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} className="form-control mb-2" />
          <textarea value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} className="form-control" />
          <hr />
        </>
      )}

      {role === 'STUDENT' && (
        <button className="btn btn-primary float-end" onClick={toggleEnrollmentsView}>
          {showAllCourses ? "View Enrolled Courses" : "View All Courses"}
        </button>
      )}


      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src="/images/reactjs.jpg" width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>

                    {(role === 'STUDENT' || role === 'FACULTY') && (
                      <button className="btn btn-primary"> Go </button>
                    )}

                    {role === 'STUDENT' && (
                      isEnrolled(course._id) ? (
                        <button className="btn btn-danger float-end" onClick={async (e) => {
                          e.preventDefault(); await removeEnrollment;}}>
                          Unenroll
                        </button>
                      ) : (
                        <button className="btn btn-success float-end" onClick={async (e) => { e.preventDefault(); await addErollments; }}>
                          Enroll
                        </button>
                      )
                    )}
                    {role === 'FACULTY' && (
                      <>
                        <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </>
                    )}



                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}