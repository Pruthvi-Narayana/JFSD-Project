import React from 'react';

const ProjectCard = ({ project }) => {
  // Destructure the project object for easy access to its properties
  const { title, description, createdAt, teamLeader, teamMembers } = project;

  // Inline styles for the card component
  const cardStyle = {
    maxWidth: '500px',
    backgroundColor: '#f8f9fd',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#333',
  };

  const descriptionStyle = {
    color: '#555',
    fontSize: '1rem',
    marginBottom: '10px',
  };

  const footerStyle = {
    fontSize: '0.9rem',
    color: '#888',
    marginBottom: '5px',
  };

  const teamMemberStyle = {
    fontSize: '1rem',
    color: '#555',
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h5 className="card-title" style={titleStyle}>{title}</h5>
        <p className="card-text" style={descriptionStyle}>{description}</p>
        <p><strong>Status:</strong> {project.status}</p>

        {/* Display Team Leader */}
        <footer className="blockquote-footer" style={footerStyle}>
          <strong>Team Leader:</strong> {teamLeader?.fullName || "N/A"}
        </footer>

        {/* Display Team Members */}
        <div>
          <strong>Team Members:</strong>
          <ul>
            {teamMembers && teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <li key={member.id} style={teamMemberStyle}>
                  {member.fullName} ({member.role})
                </li>
              ))
            ) : (
              <li style={teamMemberStyle}>No team members</li>
            )}
          </ul>
        </div>

        <footer className="blockquote-footer" style={footerStyle}>
          Created on: {new Date(createdAt).toLocaleDateString()}
        </footer>
      </div>
    </div>
  );
};

export default ProjectCard;
