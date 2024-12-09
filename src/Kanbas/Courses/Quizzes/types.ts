// changed
export interface Quiz {
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
    
  }
  
  export interface User {
    _id: string;
    role: "STUDENT" | "FACULTY" | "ADMIN";
  }
  
  export interface Attempt {
    lastAttempt: string | number | Date;
    _id: string;
    quizId: string;
    userId: string;
    attemptCount: number;
    score: number;
    completedAt: string;
  }
  
  
  export interface RootState {
    quizzesReducer: {
      quizzes: Quiz[];
    };
    accountReducer: {
      currentUser: User | null;
    };
  }
  
  export interface Choice {
    _id: string;
    question: string;
    correct: boolean;
    answer: string;
    selected: boolean;
  }
  
  export interface QuizAnswerType {
    _id: string;
    text: string;
    selected?: boolean;
  }
  
  export interface Quizs {
    score?: number;
    _id: string;
    lastAttempt?: any;
    title: string;
    description: string;
    questions: QuizQuestion[]; 
  }
  
  export interface QuizQuestion {
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
  
  export interface AttemptQuestionType {
    _id: string;
    questionId: string;
    selectedAnswerIds: string[]; // Array of selected answer IDs for the question
  }

  export interface Attempts {
    lastAttempt: any;
    _id: string;
    quizId: string;
    userId: string;
    questions: AttemptQuestionType[];
    score: number;
    attemptDate: string;
  }
  export interface RootStates {
    quizzesReducer: {
      quizzes: Quizs[];
    };
    accountReducer: {
      currentUser: User | null;
    };
  }