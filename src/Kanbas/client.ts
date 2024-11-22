import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER|| 'http://localhost:4000';
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
