import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`);
  return response.data;
}

export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/courses/${courseId}/assignments`,
    assignment);
  return response.data;
}

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/courses/${assignmentId}/assignments/`);
  return response.data;
}

export const updateAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/courses/${assignment._id}/assignments/`,
    assignment);
  return response.data;
}