package com.example.collaboration.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.collaboration.model.Project;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
}
