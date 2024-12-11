package com.example.collaboration.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.collaboration.model.ReviewRequest;
import com.example.collaboration.model.ReviewStatus;
import com.example.collaboration.service.ReviewRequestService;

@RestController
@RequestMapping("/api/review-requests")
public class ReviewRequestController {

    @Autowired
    private ReviewRequestService reviewRequestService;

    // Create a new review request
    @PostMapping("/task/{taskId}")
    public ResponseEntity<ReviewRequest> createReviewRequest(
            @PathVariable UUID taskId,
            @RequestBody ReviewRequest reviewRequest) {
        ReviewRequest createdRequest = reviewRequestService.createReviewRequest(taskId, reviewRequest);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    // Get all review requests
    @GetMapping
    public ResponseEntity<List<ReviewRequest>> getAllReviewRequests() {
        List<ReviewRequest> reviewRequests = reviewRequestService.getAllReviewRequests();
        return ResponseEntity.ok(reviewRequests);
    }

    // Get review request by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReviewRequest> getReviewRequestById(@PathVariable UUID id) {
        ReviewRequest reviewRequest = reviewRequestService.getReviewRequestById(id);
        return ResponseEntity.ok(reviewRequest);
    }

    // Get pending reviews for a mentor
    @GetMapping("/pending/{mentorId}")
    public ResponseEntity<List<ReviewRequest>> getPendingReviews(@PathVariable UUID mentorId) {
        List<ReviewRequest> pendingReviews = reviewRequestService.getPendingReviews(mentorId);
        return ResponseEntity.ok(pendingReviews);
    }

    // Update review status and feedback
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewRequest> updateReview(
            @PathVariable UUID reviewId,
            @RequestParam String feedback,
            @RequestParam ReviewStatus status) {
        ReviewRequest updatedReview = reviewRequestService.updateReview(reviewId, feedback, status);
        return ResponseEntity.ok(updatedReview);
    }

    // Exception handler for review request not found
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleNotFoundException(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}