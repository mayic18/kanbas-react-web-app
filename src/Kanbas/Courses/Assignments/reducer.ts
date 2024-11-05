import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
import * as db from "../../Database";
import { Assignment } from "./types";


interface AssignmentsState {
    assignments: Assignment[];
  }
  

const initialState: AssignmentsState = {
    assignments: db.assignments || [], 
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Omit<Assignment, "_id">>) => {
        const newAssignment: Assignment = {
          _id: new Date().getTime().toString(),
          ...action.payload,
        };
        state.assignments = [...state.assignments, newAssignment];
      },
      deleteAssignment: (state, action) => {
        const assignmentId = action.payload;
        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== assignmentId
        );
      },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      );
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;