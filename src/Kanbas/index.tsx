import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import "./styles.css";
import KanbasNavigation from "./Navigation";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUsers = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      console.log("Enrolled courses from backend:", courses);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      console.log("Before updating courses state:", courses);
      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          }
          return course;
        })
      );
      console.log("After updating courses state:", courses);
    } catch (error) {
      console.error("Enrollment update failed:", error);
    }
  };
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUsers();
    }
  }, [currentUser, enrolling]);
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })
    );
  };
  const addNewCourse = async () => {
    // const newCourse = await userClient.createCourse(course);
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };
 
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => {return course && course._id !== courseId}));
  };
  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={<ProtectedRoute><Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse} 
              enrolling={enrolling} 
              setEnrolling={setEnrolling}
              updateEnrollment={updateEnrollment}/></ProtectedRoute>} />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses
              courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}