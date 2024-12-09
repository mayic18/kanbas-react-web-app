import {useParams,useLocation,useNavigate,} from "react-router";
  import { Link } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { addQuiz, updateQuiz } from "./reducer";
  import { useState } from "react";
  import ProtectedRouteRole from "../ProtectedRoute/ProtectedRouteRole";
  import { FaPlus } from "react-icons/fa";
  import QuestionEditor from "./QuestionEditor";
  import QuizDetailsEditor from "./QuizDetailsEditor";
  import * as coursesClient from "../client";
  
  export default function QuizEditor() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(
      quizzes.find((quiz: { _id: string | undefined }) => quiz._id === qid) ?? {
        name: "",
        course: cid,
        description: "",
        questions: [],
      }
    );
  
    const foundQuiz = quizzes.find((q: any) => q._id === qid);
  
    const handleSubmit = async (quiz: any) => {
      if (foundQuiz) {
        console.log("Updating Quiz");
        console.log(quiz);
        const updatedQuiz = await coursesClient.updateQuizForCourse(
          cid as string,
          quiz
        );
        dispatch(updateQuiz(updatedQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
      } else {
        console.log("Creating New Quiz");
        const newQuiz = await coursesClient.createQuizForCourse(
          cid as string,
          quiz
        );
        dispatch(addQuiz(newQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
      }
      return quiz._id;
    };
  
    const handlePublish = async (quiz: any) => {
      if (foundQuiz) {
        console.log("Updating Quiz");
        console.log(quiz);
        const updatedQuiz = await coursesClient.updateQuizForCourse(
          cid as string,
          { ...quiz, published: true }
        );
        dispatch(updateQuiz(updatedQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      } else {
        console.log("Creating New Quiz");
        const newQuiz = await coursesClient.createQuizForCourse(cid as string, {
          ...quiz,
          published: true,
        });
        dispatch(addQuiz(newQuiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      }
      return quiz._id;
    };
  
    const addQuestion = () => {
      const newQuestion: any = {
        _id: new Date().getTime().toString() + "00000000000",
        quiz: qid,
        type: "Multiple Choice",
        choice: [],
        edit: false,
      };
      setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
    };
    return (
      <ProtectedRouteRole>
        <div className="col col-lg-8 align-items-center justify-content-center ms-auto me-auto">
          <div className="d-flex align-items-center justify-content-center">
            <div className="fs-4 ms-auto">
              Points:{" "}
              {quiz.questions.reduce(
                (sumQuestions: any, question: { points: any }) =>
                  sumQuestions + (question.points || 0),
                0,
                0
              )}
            </div>
            {pathname.includes("Questions") && (
              <button
                id="wd-add-question"
                className="btn btn-secondary float-end ms-2"
                onClick={addQuestion}
              >
                <FaPlus className="position-relative me-2" />
                New Question
              </button>
            )}
            <button
              id="wd-add-question"
              className="btn btn-secondary float-end ms-2"
              onClick={(e) =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)
              }
            >
              Preview Quiz
            </button>
          </div>
          <hr />
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname.includes("Details") ? "active" : "text-danger"
                }`}
                aria-current="page"
                to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Details`}
              >
                Details
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link  ${
                  pathname.includes("Questions") ? "active" : "text-danger"
                }`}
                aria-current="page"
                to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}
              >
                Questions
              </Link>
            </li>
          </ul>
          {pathname.includes("Questions") && (
            <div>
              <div>
                {quiz.questions.map((question: any) => (
                  <QuestionEditor
                    question={question}
                    updateQuestion={(question) => {
                      setQuiz({
                        ...quiz,
                        questions: quiz.questions.map((q: { _id: string }) =>
                          q._id === question._id ? question : q
                        ),
                      });
                    }}
                  />
                ))}
              </div>
              <hr />
              <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                <button
                  id="wd-quiz-cancel"
                  className="btn  btn-secondary ms-4 me-1 float-start"
                >
                  Cancel
                </button>
              </Link>
              <button
                id="wd-quiz-save"
                className="btn btn-danger me-1 float-start"
                onClick={() => handleSubmit(quiz)}
              >
                Save
              </button>
            </div>
          )}
          {pathname.includes("Details") && (
            <QuizDetailsEditor
              handleSubmit={handleSubmit}
              handlePublish={handlePublish}
              quizzes={quizzes}
              qid={qid as string}
            />
          )}
        </div>
      </ProtectedRouteRole>
    );
  }