import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const getUserQuizAttempts = async (courseId: string, quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${QUIZZES_API}/${quizId}/attempts`
    );
   
    return response.data;
  } catch (error) {
    console.error("Error fetching user quiz attempts:", error);
    throw error;
  }
};

export const incrementUserQuizAttempt = async (
  quizId: string
) => {
  try {
    const response = await axiosWithCredentials.post(
      `${QUIZZES_API}/${quizId}/attempts`
    );
    return response.data;
  } catch (error) {
    console.error("Error incrementing user quiz attempt:", error);
    throw error;
  }
};

export const getAllAttemptsForQuiz = async (quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${QUIZZES_API}/${quizId}/attempts`
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching all attempts for quiz:", error);
    throw error;
  }
};


export const getAttemptById = async (attemptId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${ATTEMPTS_API}/${attemptId}`
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching attempt by ID:", error);
    throw error;
  }
};


export const createAttempt = async (
  courseId: string,
  quizId: string,
  attemptData: object
) => {
  try {
    const response = await axiosWithCredentials.post(
      `${QUIZZES_API}/${quizId}/attempts`,
      attemptData
    );
    return response.data; 
  } catch (error) {
    console.error("Error creating new attempt:", error);
    throw error;
  }
};

export const updateAttempt = async (
  attemptId: string,
  attemptUpdates: object
) => {
  try {
    const response = await axiosWithCredentials.put(
      `${ATTEMPTS_API}/${attemptId}`,
      attemptUpdates
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating attempt:", error);
    throw error;
  }
};

export const deleteAttempt = async (attemptId: string) => {
  try {
    const response = await axiosWithCredentials.delete(
      `${ATTEMPTS_API}/${attemptId}`
    );
    return response.data; 
  } catch (error) {
    console.error("Error deleting attempt:", error);
    throw error;
  }
};

export const getLatestAttemptForQuiz = async (quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${QUIZZES_API}/${quizId}/attempts/latest`
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching latest attempt for quiz:", error);
    throw error;
  }
};