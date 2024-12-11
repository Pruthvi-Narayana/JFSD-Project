import React, { useState } from 'react';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teamLeader: '',
    mentor: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        teamLeader: { id: formData.teamLeader },
        mentor: { id: formData.mentor },
      };
      await createProject(payload);
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center">Create Project</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Project Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Project Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="teamLeader" className="form-label">
            Team Leader ID
          </label>
          <input
            type="text"
            className="form-control"
            id="teamLeader"
            name="teamLeader"
            value={formData.teamLeader}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mentor" className="form-label">
            Mentor ID
          </label>
          <input
            type="text"
            className="form-control"
            id="mentor"
            name="mentor"
            value={formData.mentor}
            onChange={handleChange}
            
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
