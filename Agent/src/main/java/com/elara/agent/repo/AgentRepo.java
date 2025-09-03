package com.elara.agent.repo;

import com.elara.agent.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgentRepo extends JpaRepository<Agent, Long> {}
