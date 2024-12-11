package com.example.collaboration.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.collaboration.model.Project;
import com.example.collaboration.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project createdProject = projectService.createProject(project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable UUID id) {
        Project project = projectService.getProjectById(id);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping("/{projectId}/members")
    public ResponseEntity<String> addTeamMember(
            @PathVariable UUID projectId,
            @RequestBody UUID userId) {
        projectService.addTeamMember(projectId, userId);
        return new ResponseEntity<>("Team member added successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}/members/{userId}")
    public ResponseEntity<String> removeTeamMember(
            @PathVariable UUID projectId,
            @PathVariable UUID userId) {
        projectService.removeTeamMember(projectId, userId);
        return new ResponseEntity<>("Team member removed successfully!", HttpStatus.OK);
    }
}
