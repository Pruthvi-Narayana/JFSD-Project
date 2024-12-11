import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const projectId = '0e3230b8-3d80-4f41-a314-a24c3d81210e'; // Replace with actual project ID

  useEffect(() => {
    // Fetch tasks when the component mounts
    axios.get(`http://localhost:5555/api/projects/${projectId}/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, [projectId]);

  const handleCreateTask = () => {
    // Create new task via API POST request
    if (newTask) {
      axios.post(`http://localhost:5555/api/projects/${projectId}/tasks`, { taskName: newTask })
        .then(response => {
          // On successful creation, fetch the updated tasks
          setTasks([...tasks, response.data]);
          setNewTask(''); // Clear the new task input
        })
        .catch(error => {
          console.error('There was an error creating the task!', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-dark mb-4">Dashboard</h2>
      <div className="row mt-4">
        {/* Projects Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center bg-light p-4 rounded">
              <h5 className="card-title text-primary">Projects</h5>
              <p className="card-text text-muted">View and manage your projects.</p>
              <Link to="/projects" className="btn btn-primary btn-lg">
                Go to Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center bg-light p-4 rounded">
              <h5 className="card-title text-success">Tasks</h5>
              <p className="card-text text-muted">View and manage your tasks.</p>
              <button className="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#taskModal">
                Go to Tasks
              </button>
            </div>
          </div>
        </div>

        {/* Mentor Reviews Card */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center bg-light p-4 rounded">
              <h5 className="card-title text-info">Mentor Reviews</h5>
              <p className="card-text text-muted">Manage and view mentor reviews.</p>
              <Link to="/reviews" className="btn btn-info btn-lg">
                Go to Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Modal */}
      <div className="modal fade" id="taskModal" tabIndex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title" id="taskModalLabel">Manage Tasks</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h6 className="text-dark">Existing Tasks</h6>
              <div className="list-group">
                {tasks.map((task) => (
                  <div className="list-group-item list-group-item-action" key={task.id}>
                    <h5 className="text-dark">{task.taskName}</h5>
                    {/* Add task status or other details if needed */}
                  </div>
                ))}
              </div>

              {/* Create New Task */}
              <div className="mt-3">
                <h6 className="text-dark">Create New Task</h6>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter task name"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
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
