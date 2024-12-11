package com.example.collaboration.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

    @Data
    @Entity
    public class ReviewRequest {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private UUID id;

        @ManyToOne
        @JoinColumn(name = "task_id", nullable = false)
        private Task task;

        @ManyToOne
        @JoinColumn(name = "requested_by", nullable = false)
        private User requestedBy;

        @Enumerated(EnumType.STRING)
        private ReviewStatus status = ReviewStatus.PENDING;

        private String feedback;

        // Getters and setters
    }
