import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
    
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },
    
    deleteQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quiz._id);
    },
    
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
    publish: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? { ...quiz, published: true } : q
      ) as any;
    },
    unPublish: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? { ...quiz, published: false } : q
      ) as any;
    },
  },
});
export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  publish,
  unPublish,
  setQuizzes,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;