import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../api/apiService';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getAllProjects();
      setProjects(response.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;