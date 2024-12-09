import DOMPurify from "isomorphic-dompurify";
import { useState } from "react";
import {Choice, QuizAnswerType} from "./types";

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

export default function QuizQuestion({
  question,
  updateQuestion,
  review,
}: {
  question: QuizQuestion;
  updateQuestion: (updatedQuestion: QuizQuestion) => void;
  review: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleChoiceSelect = (choiceId: string) => {
    const updatedQuestion = {
      ...question,
      choices: question.choices.map((choice) =>
        choice._id === choiceId
          ? { ...choice, selected: true }
          : { ...choice, selected: false }
      ),
    };
    updateQuestion(updatedQuestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if input matches any choice's answer
    const updatedChoices = question.choices.map((choice) => ({
      ...choice,
      selected: choice.answer.toLowerCase() === value.toLowerCase(),
    }));

    const updatedQuestion = {
      ...question,
      choices: updatedChoices,
    };
    updateQuestion(updatedQuestion);
  };

  return (
    <div>
      <form
        id="wd-assignments-editor"
        className={`g-4 border rounded p-3 mt-4 bg-light ${
          review &&
          (question.correct
            ? "border-success"
            : question.correct === false
            ? "border-danger"
            : "border-warning")
        }`}
      >
        <fieldset className="d-flex align-items-center">
          <div className="fs-5">{question.title}</div>
          <div className="d-inline-flex align-items-center ms-auto">
            <label
              htmlFor={`question-points-${question._id}`}
              className="fs-6 ms-auto"
            >
              pts:
            </label>
            <span className="fs-6">
              &nbsp;
              {question.points}
            </span>
          </div>
          <hr />
        </fieldset>

        <div className="mt-2">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question.question),
            }}
          />
        </div>
        {question.choices &&
          question.choices.map((choice) => (
            <div key={choice._id}>
              {question.type !== "Fill In the Blank" && !review && (
                <button
                  type="button"
                  className={`border rounded mb-2 mt-2 p-2 ps-3 bg-white w-100 text-start ${
                    choice.selected && "fw-bolder text-success border-success"
                  }`}
                  onClick={() => handleChoiceSelect(choice._id)}
                >
                  {choice.answer}
                </button>
              )}
              {question.type !== "Fill In the Blank" && review && (
                <div
                  className={`border rounded mb-2 mt-2 p-2 ps-3 bg-white w-100 text-start ${
                    choice.selected && "fw-bolder text-success border-dark"
                  }`}
                >
                  {choice.answer}
                </div>
              )}
            </div>
          ))}
        {question.type === "Fill In the Blank" && !review && (
          <div>
            <input
              className="form-control border rounded mb-2 mt-2 p-2 ps-3 bg-white w-50 text-start"
              type="text"
              placeholder="Type your answer here..."
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        )}
        {question.type === "Fill In the Blank" && review && (
          <div className="form-control border rounded mb-2 mt-2 p-2 ps-3 bg-white w-50 text-start">
            Insert user answer
          </div>
        )}
      </form>
    </div>
  );
}