import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Account/ProtectedCourseRoute";
import { RootState } from './store';
import * as userClient from "./Account/client";
import Session from "./Account/Session";
import * as coursesClient from "./client"
export default function Kanbas() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

  const [allCourses, setAllCourses] = useState<any[]>([]);
  const fetchAllCoursesFunc = async () => {
    try {
      const courses = await coursesClient.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchAllCoursesFunc();
  }, [currentUser]);
  
  return (
    <Session>
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard course={course} setCourse={setCourse} allCourses={allCourses}/>
            </ProtectedRoute>} />
          <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={allCourses} /></ProtectedRoute>} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
    </Session>
  );}