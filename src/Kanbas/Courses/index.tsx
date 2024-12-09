import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation} from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Quizzes from "./Quizzes/index"
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";
import * as courseClient  from "./client";
import { useEffect, useState } from "react";
import QuizDetails from "./Quizzes/QuizDetail";
import ProtectedRouteQuizEditor from "./ProtectedRoute/ProtectedRouteQuizEditor";
import QuizReview from "./Quizzes/QuizReview";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview";
export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const users = await courseClient.findUsersForCourse(cid as string);
    setUsers(users);
  }; 
  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name} &gt; {pathname.split("/")[4]} </h2> <hr />
      
    
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
          
        </div>
        
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />  
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable users={users}/>} />
            <Route path="Quizzes" element={<Quizzes />} />
                <Route path="Quizzes/:qid" element={<QuizDetails />} />
                <Route
                  path="Quizzes/:qid/Edit/*"
                  element={
                    <ProtectedRouteQuizEditor>
                      <QuizEditor />
                    </ProtectedRouteQuizEditor>
                  }
                />
                <Route
                  path="Quizzes/:qid/Preview"
                  element={
                    <ProtectedRouteQuizEditor>
                      <QuizPreview />
                    </ProtectedRouteQuizEditor>
                  }
                />
                <Route path="Quizzes/:qid/Review" element={<QuizReview />} />
                <Route path="Quizzes/:qid/Attempt" element={<QuizPreview />} />
                <Route path="Grades" element={<h2>Grades</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

  