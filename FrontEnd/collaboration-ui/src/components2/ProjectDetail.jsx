import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, addTeamMember, removeTeamMember } from '../api/apiService';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newMemberId, setNewMemberId] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      const response = await getProjectById(id);
      setProject(response.data);
    };
    fetchProject();
  }, [id]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addTeamMember(id, newMemberId);
      const response = await getProjectById(id);
      setProject(response.data);
      setNewMemberId('');
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await removeTeamMember(id, memberId);
      const response = await getProjectById(id);
      setProject(response.data);
    } catch (error) {
      console.error('Error removing team member:', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-detail">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
      <p>Team Leader: {project.teamLeader.fullName}</p>
      <p>Mentor: {project.mentor ? project.mentor.fullName : 'None'}</p>
      <h3>Team Members</h3>
      <ul>
        {project.teamMembers.map(member => (
          <li key={member.id}>
            {member.fullName} <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddMember}>
        <input
          type="text"
          value={newMemberId}
          onChange={(e) => setNewMemberId(e.target.value)}
          placeholder="New Member ID"
          required
        />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default ProjectDetail;