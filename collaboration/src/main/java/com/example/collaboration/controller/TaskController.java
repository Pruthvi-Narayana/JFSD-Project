package com.example.collaboration.controller;

import com.example.collaboration.model.Task;
import com.example.collaboration.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(
            @PathVariable UUID projectId,
            @RequestBody Task task) {
        try {
            Task createdTask = taskService.createTask(projectId, task);
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(@PathVariable UUID projectId) {
        try {
            List<Task> tasks = taskService.getAllTasks(projectId);
            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(
            @PathVariable UUID projectId,
            @PathVariable UUID taskId) {
        try {
            Task task = taskService.getTaskById(taskId);
            if (task.getProject().getId().equals(projectId)) {
                return new ResponseEntity<>(task, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(
            @PathVariable UUID projectId,
            @PathVariable UUID taskId,
            @RequestBody Task task) {
        try {
            Task updatedTask = taskService.updateTask(taskId, task);
            if (updatedTask.getProject().getId().equals(projectId)) {
                return new ResponseEntity<>(updatedTask, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<HttpStatus> deleteTask(
            @PathVariable UUID projectId,
            @PathVariable UUID taskId) {
        try {
            taskService.deleteTask(taskId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{taskId}/attachments")
    public ResponseEntity<Task> addAttachment(
            @PathVariable UUID projectId,
            @PathVariable UUID taskId,
            @RequestBody String attachmentPath) {
        try {
            Task updatedTask = taskService.addAttachment(taskId, attachmentPath);
            if (updatedTask.getProject().getId().equals(projectId)) {
                return new ResponseEntity<>(updatedTask, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}