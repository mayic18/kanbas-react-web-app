import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "./client"; // Ensure this includes getLatestAttemptForQuiz
import * as coursesClient from "../client"; // If needed
import { FaPencil } from "react-icons/fa6";
import { setQuizzes } from "./reducer";

interface Quiz {
  _id: string;
  title: string;
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  allowMultipleAttempts: boolean;
  maxAttempts: number;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcam: boolean;
  lockQuestions: boolean;
  dueDate: string | null;
  availableFrom: string | null;
  availableUntil: string | null;
  // Add other quiz properties as needed
}

interface User {
  _id: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
}

interface Attempt {
  lastAttempt: string | number | Date;
  _id: string;
  quizId: string;
  userId: string;
  attemptCount: number;
  score: number;
  completedAt: string;
}

interface RootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

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

  // Existing state for user attempts
  const [userAttempts, setUserAttempts] = useState<number | null>(null);
  const [loadingAttempts, setLoadingAttempts] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // New state for the latest attempt
  const [latestAttempt, setLatestAttempt] = useState<Attempt | null>(null);
  const [loadingLatestAttempt, setLoadingLatestAttempt] =
    useState<boolean>(true);
  const [latestAttemptError, setLatestAttemptError] = useState<string | null>(
    null
  );

  // Find the current quiz based on qid
  const this_quiz = quizzes.find((quiz) => quiz._id === qid) || defaultQuiz;

  useEffect(() => {
    const fetchUserAttempts = async () => {
      // 检查条件是否满足，避免不必要的请求
      if (!currentUser || !currentUser._id || !qid || !cid) {
        setLoadingAttempts(false); // 条件不足时直接停止加载
        return;
      }
  
      try {
        // 发起 API 请求获取用户尝试次数
        const attemptData = await quizzesClient.getUserQuizAttempts(cid, qid);
        console.log("Attempt Data:", attemptData);
  
        // 检查响应数据结构，确保 attemptCount 存在
        if (attemptData && typeof attemptData.attemptCount === "number") {
          setUserAttempts(attemptData.attemptCount);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err: any) {
        console.error("Error fetching user attempts:", err);
        setError("Failed to fetch your quiz attempts.");
      } finally {
        setLoadingAttempts(false); // 确保无论成功或失败都停止加载状态
      }
    };
  

    const fetchLatestAttempt = async () => {
        console.log("Requesting URL:", `/api/quizzes/${qid}/attempts/latest`);
      if (currentUser && currentUser._id && qid) {
        try {
          const latest = await quizzesClient.getLatestAttemptForQuiz(qid);
          console.log("Latest Attempt:", latest);
          setLatestAttempt(latest);
          setLoadingAttempts(false); 
        } catch (err: any) {
          console.error("Error fetching latest attempt:", err);
          setLatestAttemptError("Failed to fetch the latest attempt.");
        } finally {
          setLoadingLatestAttempt(false);
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

    // Check if multiple attempts are allowed
    if (!this_quiz.allowMultipleAttempts) {
      // If multipleAttempts is false, allow only one attempt
      if (userAttempts && userAttempts >= 1) {
        alert("Quiz had been attended.");
        return;
      }
    } else {
      // If multipleAttempts is true, check against maxAttempts
      if (userAttempts !== null && userAttempts >= this_quiz.maxAttempts) {
        alert(
          `You have reached the maximum of ${this_quiz.maxAttempts} attempts for this quiz.`
        );
        return;
      }
    }

    try {
      // Optionally, you can create a new attempt here or handle it in the attempt page
      // Navigate to the quiz attempt page
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Attempt`);
    } catch (err: any) {
      console.error("Error beginning the quiz:", err);
      alert("Failed to begin the quiz. Please try again later.");
    }
  };

  if (!this_quiz) {
    return <div>Loading quiz details...</div>;
  }

  return (
    <div>
      {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
        <div>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`}>
            <button className="btn btn-secondary me-2">Preview</button>
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Details`}>
            <button className="btn btn-secondary">
              <FaPencil className="me-2" />
              Edit
            </button>
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Review`}>
            <button className="btn btn-secondary ms-2">
              Review Last Attempt
            </button>
          </Link>
          <hr />
          <h3 className="mt-2 mb-4 ms-3">{this_quiz.title}</h3>
          {/* Quiz Details */}
          {/* ... (Existing quiz details layout) */}
          <div className="row">
            <div className="col-3 text-end">
              <span className="float-end">
                <strong>Available</strong>
              </span>
            </div>
            <div className="col-9">
              from&nbsp;
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

      {currentUser?.role === "STUDENT" && (
        <div>
          <button
            className="btn btn-danger ms-3"
            onClick={handleBeginQuiz}
            disabled={loadingAttempts}
          >
            {loadingAttempts ? "Loading..." : "Begin Quiz"}
          </button>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Review`}>
            <button
              className="btn btn-secondary ms-3"
              disabled={loadingLatestAttempt || !latestAttempt}
            >
              Review Last Attempt
            </button>
          </Link>
          {error && <div className="text-danger mt-2">{error}</div>}
          {latestAttemptError && (
            <div className="text-danger mt-2">{latestAttemptError}</div>
          )}
          {!loadingAttempts && (
            <div className="mt-2">
              <strong>
                Attempts:{" "}
                {userAttempts !== null
                  ? `${userAttempts} / ${this_quiz.maxAttempts}`
                  : "N/A"}
              </strong>
            </div>
          )}
          {!loadingLatestAttempt && latestAttempt && (
            <div className="mt-2">
              <strong>Latest Attempt:</strong>
              <div>Score: {latestAttempt.score}</div>
              <div>
                Completed At:{" "}
                {new Date(latestAttempt.lastAttempt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
              {/* Add more details about the latest attempt as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizDetails;