import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enroll`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
 };
 
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course.courseId}`, course);
  return data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return response.data;
};
export const enroll = async (courseID: string, userID: string) => {
  const response = await axiosWithCredentials.put(`${ENROLLMENTS_API}/${courseID}/${userID}`);
  return response.data;
}
export const unenroll = async (courseID: string, userID: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseID}/${userID}`);
  return response.data;
}
