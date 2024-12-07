import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from './Courses/Assignments/reducer';
import userReducer from "./Enrollments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer: assignmentsReducer,
    user: userReducer,
    quizzesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;