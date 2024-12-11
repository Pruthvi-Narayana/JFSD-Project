import axios from "axios";

const API_URL = "http://localhost:5555/api";

export const registerUser = (user) =>
  axios.post(`${API_URL}/auth/register`, user);
export const loginUser = (user) => axios.post(`${API_URL}/auth/login`, user);
export const createProject = (project) =>
  axios.post(`${API_URL}/projects`, project);
export const getAllProjects = () => axios.get(`${API_URL}/projects`);
export const getProjectById = (id) => axios.get(`${API_URL}/projects/${id}`);
export const addTeamMember = (projectId, userId) =>
  axios.post(`${API_URL}/projects/${projectId}/members`, userId);
export const removeTeamMember = (projectId, userId) =>
  axios.delete(`${API_URL}/projects/${projectId}/members/${userId}`);
export const createTask = (projectId, task) =>
  axios.post(`${API_URL}/projects/${projectId}/tasks`, task);
export const getAllTasks = (projectId) =>
  axios.get(`${API_URL}/projects/${projectId}/tasks`);
export const getTaskById = (projectId, taskId) =>
  axios.get(`${API_URL}/projects/${projectId}/tasks/${taskId}`);
export const updateTask = (projectId, taskId, task) =>
  axios.put(`${API_URL}/projects/${projectId}/tasks/${taskId}`, task);
export const deleteTask = (projectId, taskId) =>
  axios.delete(`${API_URL}/projects/${projectId}/tasks/${taskId}`);
export const addAttachment = (projectId, taskId, attachmentPath) =>
  axios.post(
    `${API_URL}/projects/${projectId}/tasks/${taskId}/attachments`,
    attachmentPath
  );
export const createReviewRequest = (taskId, reviewRequest) =>
  axios.post(`${API_URL}/review-requests/task/${taskId}`, reviewRequest);
export const getAllReviewRequests = () =>
  axios.get(`${API_URL}/review-requests`);

export const getReviewRequestById = (id) =>
  axios.get(`${API_URL}/review-requests/${id}`);

export const getPendingReviews = (mentorId) =>
  axios.get(`${API_URL}/review-requests/pending/${mentorId}`);

export const updateReview = (reviewId, feedback, status) =>
  axios.put(`${API_URL}/review-requests/${reviewId}`, { feedback, status });
