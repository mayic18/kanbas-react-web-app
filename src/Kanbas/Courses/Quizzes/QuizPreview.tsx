import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ProtectedRouteRole from "../ProtectedRoute/ProtectedRouteRole";
import QuizQuestion from "./QuizQuestion";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import DOMPurify from "dompurify";
import * as quizzesClient from "./client";
import { FaQuestionCircle } from "react-icons/fa"
// changed


export default function QuizPreview() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState(
    quizzes.find((quiz: { _id: string | undefined }) => quiz._id === qid) ?? {
      name: "",
      course: cid,
      description: "",
      questions: [],
    }
  );

  const updateQuestionInQuiz = (updatedQuestion: any) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q: { _id: string }) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      ),
    });
  };

  const navigate = useNavigate();
  const save = async () => {
    if (!cid) {
      console.error("Course ID is undefined");
      return;
    }

    let correctCount = 0;

    quiz.questions.forEach((question: { choices: any[] }) => {
      const correctChoice = question.choices.find(
        (choice) => choice.correct && choice.selected
      );
      if (correctChoice) {
        correctCount++;
      }
    });

    const score = (correctCount / quiz.questions.length) * 100;

    const attemptData = {
      score: score,
      questions: quiz.questions.map((question: any) => ({
        questionId: question._id,
        selectedChoices: question.choices
          .filter((choice: any) => choice.selected)
          .map((choice: any) => choice._id),
      })),
    };

    try {
      const response = await quizzesClient.createAttempt(
        cid,
        qid!,
        attemptData
      );
      console.log("Attempt saved successfully:", response);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  console.log("quiz", quiz);

  return (
    <div className="col col-lg-8 align-items-center justify-content-center ms-auto me-auto">
      <h2>{quiz.title || "Unnamed Quiz"}</h2>
      <ProtectedRouteRole>
        <div
          id="wd-todo-error-message"
          className="text-danger alert alert-danger mt-2 mb-4 border-0"
        >
          <RiErrorWarningLine className="text-danger me-2 fs-5" />
          This is a preview of the published version of the quiz
        </div>
      </ProtectedRouteRole>
      <h3>Quiz Instructions</h3>
      <div className="mt-2">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(quiz.description),
          }}
        />
      </div>
      <hr />
      <div>
        {quiz.questions.map((question: any) => (
          <QuizQuestion
            key={question._id}
            question={question}
            review={false}
            updateQuestion={updateQuestionInQuiz}
          />
        ))}
      </div>
      <hr />
      <button
        id="wd-quiz-save"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={save}
      >
        Submit Quiz
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
        <button
          id="wd-quiz-cancel"
          className="btn btn-lg btn-secondary ms-4 me-1 float-end"
        >
          Cancel
        </button>
      </Link>
      <div>
        {/* Keep Editing This Quiz 按钮部分 */}
        <div className="d-flex justify-content-start mb-3">
          <ProtectedRouteRole>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}>
              <button
                id="wd-quiz-cancel"
                className="btn btn-lg btn-secondary me-1"
              >
                <FaPencil className="me-2 mb_2" />
                Keep Editing This Quiz
              </button>
            </Link>
          </ProtectedRouteRole>
        </div>

        
        <h4>Questions</h4>

        
        <div
          className="mt-2"
          style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
        >
          {quiz.questions.map((question: any, index: number) => (
            <button
              key={index}
              id="wd-quiz_question"
              className="text-danger border-0 bg-transparent py-2 px-3 d-flex align-items-center"
              style={{
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              <FaQuestionCircle className="me-2" />
              Question {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}