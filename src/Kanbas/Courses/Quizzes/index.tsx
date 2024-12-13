import { FaPlus } from "react-icons/fa6";
import { RxRocket } from "react-icons/rx";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import QuizControlButtons from "./QuizControlButtons";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteQuiz, setQuizzes } from "./reducer";
import { IoCaretDown } from "react-icons/io5";
// changed

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    if (currentUser.role === "STUDENT") {
      dispatch(
        setQuizzes(
          quizzes.filter((q: { published: boolean }) => q.published === true)
        )
      );
    } else {
      dispatch(setQuizzes(quizzes));
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  console.log("quizzes", quizzes);
  console.log("current user", currentUser);

  return (
    <div id="wd-quizzes" className="m-5">
      <div id="wd-search-quizzes-box" className="row">
        <div className="col-8">
          <div className="search-bar me-2 mb-2 float-start d-flex align-items-center">
            <CiSearch className="position-relative m-2 fs-4" />
            <input
              id="wd-search-assignment"
              className="form-control border-0"
              placeholder="Search..."
            ></input>
          </div>
        </div>
        {currentUser.role === "FACULTY" && (
    <div className="col-4 d-flex align-items-center justify-content-end">  
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/@/Edit/Details`}>
        <button
            id="wd-add-quizzes"
            className="btn btn-lg btn-danger me-1"
            style={{
              backgroundColor: "#B22222",
              borderColor: "#8B0000",
            }}
          >
            <FaPlus
              className="position-relative me-1"
              style={{ fontSize: "0.80em", bottom: "1px" }}
            />
            Quiz
            </button>
        </Link>
        <div className="fs-5">
            <BsThreeDotsVertical />
        </div>
    </div>
    )}
      </div>
      <br />
      <br />
      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-3 bg-white">
            <IoCaretDown className="me-2 fs-3" />
            Assignment Quizzes     
          </div>
        </li>
        <ul id="wd-quizzes-list" className="list-group rounded-0 wd-quiz">
          {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN" || currentUser.role === "STUDENT") &&
            quizzes.map(
              (quiz: {
                _id: string;
                title: string;
                course: string;
                availableFrom: Date;
                availableUntil: Date;
                dueDate: Date;
                points: number;
                questions: any[];
                attempts: any[];
                published: boolean;
              }) => (
                <li className="wd-quiz-list-item list-group-item p-3 ps-1 fs-5">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <RxRocket className="fs-5 text-success" />
                    </div>
                    <div className="col-9">
                      <a
                        className="wd-quiz-link text-decoration-none text-dark h5"
                        href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                      >
                        {quiz.title}
                      </a>
                      <br />
                      <span className="">
                        <span className="custom-gray1  fs-6">

                          <strong>Due</strong>&nbsp;
                          {quiz.dueDate &&
                            new Date(quiz.dueDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          &nbsp;&nbsp;|&nbsp;&nbsp;{quiz.points}
                          15 pts&nbsp;&nbsp;|&nbsp;&nbsp; {quiz.questions.length}
                          &nbsp;Questions
                        </span>
                        {currentUser.role === "STUDENT" && (
                          <span className="custom-gray1 fs-6">
                            &nbsp;&nbsp;| &nbsp;&nbsp;Last attempt score:{" "}
                            {quiz.attempts.find((attempt) => {
                              console.log(attempt);
                              return attempt.user === currentUser._id;
                            })?.lastScore || "15 pts"}
                          </span>
                        )}
                      </span>
                    </div>
                    { currentUser.role !== "STUDENT" && (
                    <div className="col-2">
                      {cid && <QuizControlButtons quiz={quiz} cid={cid} />}
                    </div>
                    )}
                  </div>
                </li>
              )
            )}
          
        </ul>
      </ul>
    </div>
  );
}