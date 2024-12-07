import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsBanFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteQuiz, publish, unPublish } from "./reducer";
import * as coursesClient from "../client";
export default function QuizControlButtons({
  quiz,
  cid,
}: {
  quiz: any;
  cid: string;
}) {
  const dispatch = useDispatch();
  return (
    <div className="float-end">
      {quiz.published && (
        <span
          onClick={() => {
            coursesClient.unpublishQuiz(cid, quiz._id);
            dispatch(unPublish(quiz));
          }}
        >
          <GreenCheckmark />
        </span>
      )}
      {!quiz.published && (
        <BsBanFill
          className="text-danger me-1 mt-1 fs-5"
          onClick={() => {
            coursesClient.publishQuiz(cid, quiz._id);
            dispatch(publish(quiz));
          }}
        />
      )}

      <div className="dropdown float-end">
        <IoEllipsisVertical
          className="fs-4 dropdown-toggle no-shift"
          data-bs-toggle="dropdown"
        />
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item me-0"
              href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Edit/Details`}
            >
              Edit
            </a>
          </li>
          <li>
            <button
              className="dropdown-item me-0"
              onClick={() => {
                coursesClient.deleteQuiz(cid, quiz._id);
                dispatch(deleteQuiz(quiz));
              }}
            >
              Delete
            </button>
          </li>
          <li>
            {quiz.published && (
              <button
                className="dropdown-item me-0"
                onClick={() => {
                  coursesClient.unpublishQuiz(cid, quiz._id);
                  dispatch(unPublish(quiz));
                }}
              >
                Unpublish
              </button>
            )}
            {!quiz.published && (
              <button
                className="dropdown-item me-0"
                onClick={() => {
                  coursesClient.publishQuiz(cid, quiz._id);
                  dispatch(publish(quiz));
                }}
              >
                Publish
              </button>
            )}
          </li>
          <li>
            <button className="dropdown-item me-0">Copy</button>
          </li>
          <li>
            <button className="dropdown-item me-0">Sort</button>
          </li>
        </ul>
      </div>
    </div>
  );
}