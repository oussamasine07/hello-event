package com.helloevent.backend.repository;

import com.helloevent.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Override
    Optional<User> findById(Long aLong);
    User findUserByEmail(String email);

    User findUserByUsername(String username);
}
