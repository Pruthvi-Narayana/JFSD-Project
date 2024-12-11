import React, { useEffect, useState } from 'react';
import { getAllTasks, createTask } from '../api/apiService';
import { Link, useParams } from 'react-router-dom';
import './TaskList.css';

const TaskList = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: ''
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getAllTasks(projectId);
      setTasks(response.data);
    };
    fetchTasks();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(projectId, newTask);
      const response = await getAllTasks(projectId);
      setTasks(response.data);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        assignedTo: ''
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/projects/${projectId}/tasks/${task.id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        />
        <input
          type="datetime-local"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="assignedTo"
          value={newTask.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To (User ID)"
          required
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskList;