import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enroll`;

export const addEnrollment = async (userId: string,  courseId: string) => {
  const response = await axios.post(`${REMOTE_SERVER}/${userId}/${courseId}/enroll`);
  return response.data;
}

export const deleteEnrollment = async (userId: string,  courseId: string) => {
  const response = await axios.delete(`${REMOTE_SERVER}/${userId}/${courseId}/unenroll`);
  return response.data;
}