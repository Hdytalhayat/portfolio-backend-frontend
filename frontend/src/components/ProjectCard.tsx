// src/components/ProjectCard.tsx
import React from 'react';
import type { Project } from '../types';
import { trackClick } from '../services/projectService';

// Define the props that this component will accept.
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  
  // Handle clicks on the project link.
  const handleProjectLinkClick = () => {
    // First, track the click in the background.
    trackClick(project.id);
    // Then, open the project URL in a new tab.
    window.open(project.project_url, '_blank', 'noopener noreferrer');
  };
  
  // Split the tech_stack string into an array to display as badges.
  const techBadges = project.tech_stack.split(',').map(tech => tech.trim());

  return (
    <div className="project-card">
      <img src={project.image_url} alt={`${project.title} preview`} className="project-image" />
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-stack">
          {techBadges.map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <button onClick={handleProjectLinkClick}>
            View Project
          </button>
          {project.source_code_url && (
            <a href={project.source_code_url} target="_blank" rel="noopener noreferrer">
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;