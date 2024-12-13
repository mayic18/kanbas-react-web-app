import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "./client"; // Ensure this includes getLatestAttemptForQuiz
import { FaPencil } from "react-icons/fa6";
import {  Attempt, RootState} from "./types"
//changed

const QuizDetails: React.FC = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const dispatch = useDispatch();

  const defaultQuiz = {
    course: cid,
    questions: [],
    maxAttempts: 1,
    title: "Quiz Title",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    points: 0,
    allowMultipleAttempts: false,
    assignTo: "Everyone",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcam: false,
    lockQuestions: false,
  };

  const [userAttempts, setUserAttempts] = useState<number | null>(null);
  const [loadingAttempts, setLoadingAttempts] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [latestAttempt, setLatestAttempt] = useState<Attempt | null>(null);
  const [loadingLatestAttempt, setLoadingLatestAttempt] =
    useState<boolean>(true);
  const this_quiz = quizzes.find((quiz) => quiz._id === qid) || defaultQuiz;

  useEffect(() => {
    const fetchUserAttempts = async () => {
      if (currentUser && currentUser._id && qid && cid) {
        try {
          const attemptData = await quizzesClient.getUserQuizAttempts(cid, qid);
          console.log("Attempt Data:", attemptData);
          setUserAttempts(attemptData.attemptCount);
        } catch (err: any) {
          console.error("Error fetching user attempts:", err);
          setError("Failed to fetch your quiz attempts.");
        } 
      } else {
        setLoadingAttempts(false);
      }
    };

    const fetchLatestAttempt = async () => {
        console.log("Requesting URL:", `/api/quizzes/${qid}/attempts/latest`);
      if (currentUser && currentUser._id && qid) {
        try {
          const latest = await quizzesClient.getLatestAttemptForQuiz(qid);
          console.log("Latest Attempt:", latest);
          setLatestAttempt(latest);
        } catch (err: any) {
          console.error("Error fetching latest attempt:", err);
          setError("Failed to fetch the latest attempt.");
        } 
      } else {
        setLoadingLatestAttempt(false);
      }
    };

    if (currentUser && this_quiz) {
      fetchUserAttempts();
      fetchLatestAttempt();
    }
  }, [qid, currentUser, this_quiz]);

  const handleBeginQuiz = async () => {
    if (!currentUser || !currentUser._id) {
      alert("You must be logged in to attempt the quiz.");
      return;
    }
    if (!this_quiz) {
      alert("Quiz not found.");
      return;
    }
    if (!this_quiz.allowMultipleAttempts) {
      if (userAttempts && userAttempts >= 1) {
        alert("Quiz had been attended.");
        return;
      }
    } else {
     
      if (userAttempts !== null && userAttempts >= this_quiz.maxAttempts) {
        alert(
          `You have reached the maximum of ${this_quiz.maxAttempts} attempts for this quiz.`
        );
        return;
      }
    }

    try {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Attempt`);
    } catch (err: any) {
      console.error("Error beginning the quiz:", err);
      alert("Failed to begin the quiz. Please try again later.");
    }
  };


  return (
    <div>
      {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" || currentUser?.role === "STUDENT") && (
        <div>
          {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`}>
            <button className="btn btn-secondary me-2">Preview</button>
          </Link>
          )}
          {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Details`}>
            <button className="btn btn-secondary">
              <FaPencil className="me-2" />
              Edit
            </button>
          </Link>)}
          {currentUser?.role === "STUDENT" && (
            <button
                className="btn btn-danger ms-3"
                onClick={handleBeginQuiz}
                // disabled={loadingAttempts}
              >
                {"Begin"}
              </button>  
            )}
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Review`}>         
                <button
                  className="btn btn-secondary ms-3"
                  disabled={loadingLatestAttempt || !latestAttempt}
                >
                    Last Attempt
                </button>
               </Link>
            
          <hr />
          <h3 className="mt-2 mb-4 ms-3">{this_quiz.title}</h3>
          <div className="row mb-3">
        <div className="col-md-3 text-end ">
            <label className="mt-2" htmlFor="wd-points">Points:</label>
        </div>
        <div className="col-md-8 mt-2">
         {this_quiz.points !== undefined ? this_quiz.quizType : "15"}
        </div>
        
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-group">Quiz Type: </label>
        </div>
        <div className="col-md-8 mt-2">
            {this_quiz.quizType !== undefined ? this_quiz.quizType : "Undefined"}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Assignment Group:</label>
        </div>
        <div className="col-md-8 mt-2">
            {this_quiz.assignmentGroup !== undefined ? this_quiz.assignmentGroup : "Undefined"}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Shuffle Answer </label>
        </div>
        <div className="col-md-8 mt-2">
         {this_quiz.shuffleAnswers ? "Yes" : "No"}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Time Limit</label>
        </div>
        <div className="col-md-8 mt-2">
          {this_quiz.timeLimit !== undefined ? this_quiz.timeLimit : "No"}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Multiple Attempts</label>
        </div>
        <div className="col-md-8 mt-2">
          {this_quiz.allowMultipleAttempts? "Yes" : "No"}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Show Correct Answer</label>
        </div>
        <div className="col-md-8 mt-2">
        {this_quiz.showCorrectAnswers !== undefined ? this_quiz.showCorrectAnswers : "No" }
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">One Question at a Time</label>
        </div>
        <div className="col-md-8 mt-2">
        {this_quiz.oneQuestionAtATime ? "Yes" : "No"}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Lock Down Required</label>
        </div>
        <div className="col-md-8 mt-2">
            {this_quiz.lockQuestions ? "Yes" : "No"}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Webcam Required</label>
        </div>
        <div className="col-md-8 mt-2">
        {this_quiz.webcam ? "Yes" : "No"}
        </div>
      </div>
          <div className="row">
            <div className="col-3 text-end">
              <span className="float-end">
              <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Avaliable</label>
              </span>
            </div>
            <div className="col-9 mt-2">
              from&nbsp;&nbsp;
              <strong>
                {this_quiz.availableFrom &&
                  new Date(this_quiz.availableFrom).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}
              </strong>
              &nbsp;until
              <strong>
                &nbsp;
                {this_quiz.availableUntil &&
                  new Date(this_quiz.availableUntil).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}
              </strong>
            </div>
          </div>
        </div>
      )}

      
        
      
    </div>
  );
};

export default QuizDetails;