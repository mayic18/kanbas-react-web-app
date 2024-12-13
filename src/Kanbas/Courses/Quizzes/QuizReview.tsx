import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "./reducer";
import ProtectedRouteRole from "../ProtectedRoute/ProtectedRouteRole";
import QuizQuestion from "./QuizQuestion";
import { RiErrorWarningLine } from "react-icons/ri";
import DOMPurify from "dompurify";
import * as quizzesClient from "./client"; // Ensure this includes getLatestAttemptForQuiz
import {Choice, Quizs, QuizAnswerType, Attempts, RootStates } from "./types";


interface QuizQuestion {
  _id: string;
  text: string;
  points: number;
  answers: QuizAnswerType[];
  quiz: string;
  title: string;
  type: string;
  question: string;
  choices: Choice[];
  edit: boolean;
  correct: boolean;
}


const QuizReview: React.FC = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const { pathname } = useLocation();
  const { quizzes } = useSelector((state: RootStates) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialQuiz: Quizs = quizzes.find((quiz) => quiz._id === qid) ?? {
    _id: "",
    title: "",
    description: "",
    questions: [],
    score: undefined,
    lastAttempt: undefined,
  };

  const [quiz, setQuiz] = useState<Quizs>(initialQuiz);

  // State for the latest attempt
  const [latestAttempt, setLatestAttempt] = useState<Attempts | null>(null);
  const [loadingLatestAttempt, setLoadingLatestAttempt] =
    useState<boolean>(true);
  const [latestAttemptError, setLatestAttemptError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchLatestAttempt = async () => {
      if (qid) {
        try {
          const attempt: Attempts = await quizzesClient.getLatestAttemptForQuiz(
            qid
          );
          console.log("Latest Attempt:", attempt);
          setLatestAttempt(attempt);
          const updatedQuestions = quiz.questions.map((question) => {
            const attemptQuestion = attempt.questions.find(
              (aq) => aq.questionId === question._id // Assuming questionId matches
            );

            if (attemptQuestion) {
              const updatedAnswers = question.answers.map((answer) => ({
                ...answer,
                selected: attemptQuestion.selectedAnswerIds.includes(
                  answer._id
                ),
              }));

              return {
                ...question,
                answers: updatedAnswers,
              };
            }

            return question;
          });

          setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: updatedQuestions,
            score: attempt.score,
            lastAttempt: attempt.lastAttempt,
          }));
        } catch (error: any) {
          console.error("Error fetching latest attempt:", error);
          setLatestAttemptError("Failed to fetch the latest attempt.");
        } finally {
          setLoadingLatestAttempt(false);
        }
      } else {
        setLoadingLatestAttempt(false);
      }
    };

    fetchLatestAttempt();
  }, [qid, quizzes, quiz.questions]);

  useEffect(() => {
    const updatedQuiz = quizzes.find((q) => q._id === qid);
    if (updatedQuiz) {
      setQuiz(updatedQuiz);
    }
  }, [quizzes, qid]);

  const save = () => {
    console.log(quiz);
    dispatch(updateQuiz(quiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="col col-lg-8 align-items-center justify-content-center ms-auto me-auto">
      <h2>{quiz.title || "Unnamed Quiz"}</h2>
      <ProtectedRouteRole>
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mt-2 mb-2 border-0"
        >
          <RiErrorWarningLine className="text-danger me-2 fs-5" />
          This is a preview of the published version of the quiz
        </div>
      </ProtectedRouteRole>
      <div className="fs-3 m">
        <span className="fs-3 fw-bold">Last Attempt: </span>
        {quiz.lastAttempt ? (
          new Date(quiz.lastAttempt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        ) : (
          <span>No attempts yet.</span>
        )}
      </div>
      <div className="fs-3 mb-2">
        <span className="fs-3 fw-bold">Score: </span>
        {quiz.score !== undefined
          ? `${quiz.score} / ${quiz.questions.reduce(
              (sum, question) => sum + (question.points || 0),
              0
            )}`
          : "N/A"}
      </div>
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
        {quiz.questions.map((question) => (
          <QuizQuestion
            key={question._id}
            question={question}
            review={true}
            updateQuestion={(updatedQuestion: QuizQuestion) => {
              // Ensure type consistency
              setQuiz((prevQuiz) => ({
                ...prevQuiz,
                questions: prevQuiz.questions.map((q) =>
                  q._id === updatedQuestion._id ? updatedQuestion : q
                ),
              }));
            }}
          />
        ))}
      </div>
      <hr />
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
        <button
          id="wd-quiz-cancel"
          className="btn btn-lg btn-secondary ms-4 me-1 float-end"
        >
          Back
        </button>
      </Link>
      {latestAttemptError && (
        <div className="text-danger mt-2">{latestAttemptError}</div>
      )}
      {loadingLatestAttempt && <div>Loading latest attempt...</div>}
    </div>
  );
};

export default QuizReview;