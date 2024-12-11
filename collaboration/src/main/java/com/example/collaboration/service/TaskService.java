package com.example.collaboration.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.collaboration.model.Project;
import com.example.collaboration.model.Task;
import com.example.collaboration.repository.ProjectRepository;
import com.example.collaboration.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Task createTask(UUID projectId, Task task) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        task.setProject(project);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks(UUID projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public Task getTaskById(UUID taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task with ID " + taskId + " not found"));
    }
    public Task updateTask(UUID taskId, Task updatedTask) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setAssignedTo(updatedTask.getAssignedTo());
        task.setDueDate(updatedTask.getDueDate());
        
        return taskRepository.save(task);
    }

    public void deleteTask(UUID taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }

    public Task addAttachment(UUID taskId, String attachmentPath) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setAttachmentPath(attachmentPath);
        return taskRepository.save(task);
    }
    
}