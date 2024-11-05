import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  role: 'STUDENT' | 'FACULTY'| String;
  enrollments: string[]; 
}
const initialEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
const initialState: { user: UserState } = {
    user: {
      role: 'FACULTY', 
      enrollments: [], 
    },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enrollInCourse: (state, { payload: courseId }) => {
      if (!state.user.enrollments.includes(courseId)) {
        state.user.enrollments.push(courseId);
        localStorage.setItem('enrollments', JSON.stringify(state.user.enrollments));
      }
    },
    unenrollFromCourse: (state, { payload: courseId }) => {
      state.user.enrollments = state.user.enrollments.filter(id => id !== courseId);
      localStorage.setItem('enrollments', JSON.stringify(state.user.enrollments));
    },
    setRole: (state, { payload: role }) => {
      state.user.role = role;
    },
  },
});

export const { enrollInCourse, unenrollFromCourse, setRole } = userSlice.actions;
export default userSlice.reducer;