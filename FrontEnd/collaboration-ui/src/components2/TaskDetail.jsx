import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskById, updateTask, createReviewRequest } from '../api/apiService';
import './TaskDetail.css';

const TaskDetail = () => {
  const { projectId, taskId } = useParams();
  const [task, setTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    assignedTo: ''
  });
  const [reviewRequest, setReviewRequest] = useState({
    feedback: '',
    requestedBy: ''
  });

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTaskById(projectId, taskId);
      setTask(response.data);
      setUpdatedTask({
        title: response.data.title,
        description: response.data.description,
        dueDate: response.data.dueDate,
        status: response.data.status,
        assignedTo: response.data.assignedTo.id
      });
    };
    fetchTask();
  }, [projectId, taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewRequest({ ...reviewRequest, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(projectId, taskId, updatedTask);
      const response = await getTaskById(projectId, taskId);
      setTask(response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReviewRequest(taskId, reviewRequest);
      setReviewRequest({
        feedback: '',
        requestedBy: ''
      });
    } catch (error) {
      console.error('Error creating review request:', error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleString()}</p>
      <p>Assigned To: {task.assignedTo.fullName}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="datetime-local"
          name="dueDate"
          value={updatedTask.dueDate}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={updatedTask.status}
          onChange={handleChange}
          required
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <input
          type="text"
          name="assignedTo"
          value={updatedTask.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To (User ID)"
          required
        />
        <button type="submit">Update Task</button>
      </form>
      <h3>Create Review Request</h3>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          name="feedback"
          value={reviewRequest.feedback}
          onChange={handleReviewChange}
          placeholder="Feedback"
          required
        />
        <input
          type="text"
          name="requestedBy"
          value={reviewRequest.requestedBy}
          onChange={handleReviewChange}
          placeholder="Requested By (User ID)"
          required
        />
        <button type="submit">Create Review Request</button>
      </form>
    </div>
  );
};

export default TaskDetail;