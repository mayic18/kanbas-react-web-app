import { Link } from "react-router-dom";

import React, { useState, useEffect  } from "react";
import { useSelector } from 'react-redux';

import * as userClient from "./Account/client";
import * as coursesClient from "./Courses/client";

export default function Dashboard({course, setCourse, allCourses }: {
  course: any; setCourse: (course: any) => void; allCourses: any[]}
  ) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [showEnrollments, setShowEnrollments] = useState(true);
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    let visibleCourses : {_id: string,
                          name: string,
                          number: string,
                          startDate: string,
                          endDate: string,
                          department: string,
                          credits: number,
                          img: string,
                          description: string}[];
    if (showEnrollments) {
      visibleCourses = filteredCourses; 
    } else {
      visibleCourses = allCourses;
    }
    const updateCourse = async () => {
      if (course.name.startsWith("@")) {
        return;
      }
      await coursesClient.updateCourse(course);
      setFilteredCourses(
        filteredCourses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      );
    };
    const addNewCourse = async () => {
      if (course.name.startsWith("@")) {
        return;
      } 
      const newCourse = await userClient.createCourse(course);
      setFilteredCourses([...filteredCourses, newCourse]);
    };
    const deleteCourse = async (courseId: string) => {
      const status = await coursesClient.deleteCourse(courseId);
      setFilteredCourses(filteredCourses.filter((course) => course._id !== courseId));
    };
    const enrollInCourse = async (courseId: string) => {
      await coursesClient.enroll(courseId, currentUser._id);
      fetchCourses();
    }
    const unenrollInCourse = async (courseId: string) => {
      await coursesClient.unenroll(courseId, currentUser._id);
      fetchCourses();
    }
    const fetchCourses = async () => {
      try {
        const courses = await userClient.findMyCourses();
        setFilteredCourses(courses);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchCourses();
    }, [currentUser]);
  
    
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        {currentUser.role === "FACULTY" && (<div><h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
        <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
        </h5><br />
        <input value={course.name} className="form-control mb-2" 
          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
        <textarea value={course.description} className="form-control" 
          onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
        <hr /></div>)}
  
        {currentUser.role === "STUDENT" && <button className="btn btn-primary float-end" id="wd-student-enrollments-click"
          onClick={() => {setShowEnrollments(!showEnrollments)}} > Enrollments </button>}
  
        <h2 id="wd-dashboard-published">Published Courses ({allCourses.length})</h2> <hr />
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {visibleCourses.map((c) => (
              <div className="wd-dashboard-course col d-flex align-items-stretch" style={{ width: "270px"}}>
                <div className="card rounded-3 overflow-hidden w-100">
                    <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to={filteredCourses.includes(c) ? `/Kanbas/Courses/${c._id}/Home` : "/Kanbas/Dashboard"}>
                    <img src={`/images/reactjs.jpg`} width="100%" height={150} alt="React logo"/>
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">{c.name}</h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {c.description}
                      </p>
                      {(showEnrollments || filteredCourses.includes(c)) && <button className="btn btn-primary"> Go </button>}
                      {currentUser.role === "FACULTY" && (<span><button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(c._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>
                      <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(c);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button></span>)}
                      {!showEnrollments && filteredCourses.find(temp => temp._id === c._id) && (<button onClick={(event) => {
                        event.preventDefault();
                        unenrollInCourse(c._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-unenroll-course-click">
                        Unenroll
                      </button>)}
                      {!showEnrollments && !filteredCourses.find(temp => temp._id === c._id) && (<button onClick={(event) => {
                        event.preventDefault();
                        enrollInCourse(c._id);
                        }}
                        className="btn btn-success float-end"
                        id="wd-enroll-course-click">
                        Enroll
                      </button>)}
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