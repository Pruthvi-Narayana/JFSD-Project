package com.example.collaboration.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.collaboration.model.ReviewRequest;
import com.example.collaboration.model.ReviewStatus;

public interface ReviewRequestRepository extends JpaRepository<ReviewRequest, UUID> {

    List<ReviewRequest> findByTaskProjectMentorIdAndStatus(UUID mentorId, ReviewStatus status);

    List<ReviewRequest> findByTaskId(UUID taskId);
}
