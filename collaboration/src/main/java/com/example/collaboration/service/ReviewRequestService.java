package com.example.collaboration.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.collaboration.model.ReviewRequest;
import com.example.collaboration.model.ReviewStatus;
import com.example.collaboration.model.Task;
import com.example.collaboration.model.User;
import com.example.collaboration.repository.ReviewRequestRepository;
import com.example.collaboration.repository.TaskRepository;

@Service
public class ReviewRequestService {

    @Autowired
    private ReviewRequestRepository reviewRequestRepository;

    @Autowired
    private TaskRepository taskRepository;

    public ReviewRequest createReviewRequest(UUID taskId, User requestedBy) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        ReviewRequest reviewRequest = new ReviewRequest();
        reviewRequest.setTask(task);
        reviewRequest.setRequestedBy(requestedBy);
        return reviewRequestRepository.save(reviewRequest);
    }

    public List<ReviewRequest> getPendingReviews(UUID mentorId) {
        return reviewRequestRepository.findByTaskProjectMentorIdAndStatus(mentorId, ReviewStatus.PENDING);
    }

    public ReviewRequest updateReview(UUID reviewId, String feedback, ReviewStatus status) {
        ReviewRequest reviewRequest = reviewRequestRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review request not found"));

        reviewRequest.setFeedback(feedback);
        reviewRequest.setStatus(status);
        return reviewRequestRepository.save(reviewRequest);
    }

    public ReviewRequest createReviewRequest(UUID taskId, ReviewRequest reviewRequest) {
        // Fetch the task by taskId
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

        // Set the task and status for the review request
        reviewRequest.setTask(task);
        reviewRequest.setStatus(ReviewStatus.PENDING); // Default status is PENDING

        return reviewRequestRepository.save(reviewRequest);
    }

    public List<ReviewRequest> getAllReviewRequests() {
        return reviewRequestRepository.findAll();
    }

    public ReviewRequest getReviewRequestById(UUID id) {
        return reviewRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Review Request not found"));
    }

    public void deleteReviewRequest(UUID id) {
        ReviewRequest reviewRequest = reviewRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review request not found"));
        reviewRequestRepository.delete(reviewRequest);
    }

}
