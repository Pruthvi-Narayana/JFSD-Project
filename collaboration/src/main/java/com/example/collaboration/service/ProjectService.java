package com.example.collaboration.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.collaboration.model.Project;
import com.example.collaboration.model.User;
import com.example.collaboration.repository.ProjectRepository;
import com.example.collaboration.repository.UserRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(UUID id) {
        if (id == null) {
            throw new RuntimeException("Invalid Project ID");
        }

        System.out.println("Fetching project with ID: " + id);

        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found for ID: " + id));
    }

    public void addTeamMember(UUID projectId, UUID userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (project.getTeamMembers().contains(user)) {
            throw new RuntimeException("User is already a team member");
        }

        project.getTeamMembers().add(user);
        projectRepository.save(project);
    }

    public void removeTeamMember(UUID projectId, UUID userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!project.getTeamMembers().contains(user)) {
            throw new RuntimeException("User is not a team member");
        }

        project.getTeamMembers().remove(user);
        projectRepository.save(project);
    }

}
