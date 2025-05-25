package com.helloevent.backend.repository;

import com.helloevent.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);

    @Query(value = "select * from users where username = ?1 or email = ?1", nativeQuery = true)
    User getUserByUsernameOrByEmail(String usernameOrEmail);

    @Query(value = "select * from users where role = 'CLIENT'", nativeQuery = true)
    List<User> getAllClients();

    @Modifying
    @Query(value = "delete from users where role = 'CLIENT' and id = ?", nativeQuery = true)
    void deleteClient(Long id);

}
