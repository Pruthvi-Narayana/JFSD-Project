import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, createTask } from '../api/api'; // Importing API functions

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To handle errors
  const projectId = '0e3230b8-3d80-4f41-a314-a24c3d81210e'; // Replace with actual project ID

  useEffect(() => {
    // Fetch tasks when the component mounts
    getAllTasks(projectId)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
        setErrorMessage('Failed to fetch tasks.');
      });
  }, [projectId]);

  const handleCreateTask = () => {
    if (newTask && taskDescription) {
      const newTaskData = {
        title: newTask,
        description: taskDescription,
        status: 'TODO',
        assignedTo: { id: '8121e3f1-e702-46b1-adb2-7c572850b6c8' }, // Assign it to a user (modify as needed)
        dueDate: '2024-12-31T23:59:59.000+00:00', // Set the due date (modify as needed)
      };

      createTask(projectId, newTaskData)
        .then(response => {
          setTasks([...tasks, response.data]); // Add the new task to the existing tasks
          setNewTask(''); // Clear the task title
          setTaskDescription(''); // Clear the task description
          setErrorMessage(''); // Clear any previous errors
        })
        .catch(error => {
          console.error('There was an error creating the task!', error);
          setErrorMessage('Failed to create task.');
        });
    } else {
      setErrorMessage('Please provide both title and description for the task.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Projects</h5>
              <p className="card-text">View and manage your projects.</p>
              <Link to="/projects" className="btn btn-primary">
                Go to Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Tasks</h5>
              <p className="card-text">View and manage your tasks.</p>
              <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#taskModal">
                Go to Tasks
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Mentor Reviews</h5>
              <p className="card-text">Manage and view mentor reviews.</p>
              <Link to="/reviews" className="btn btn-info">
                Go to Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Tasks Modal */}
      <div className="modal fade" id="taskModal" tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taskModalLabel">Manage Tasks</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h6>Existing Tasks</h6>
              <div className="list-group">
                {tasks.map((task) => (
                  <div className="list-group-item" key={task.id}>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    {/* Add task status or other details if needed */}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <h6>Create New Task</h6>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task title"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <textarea
                  className="form-control mt-2"
                  placeholder="Enter task description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                ></textarea>
                <button className="btn btn-primary mt-2" onClick={handleCreateTask}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
