package com.helloevent.backend.dto;

import com.helloevent.backend.model.Role;

public record RegisterDTO(
        String first_name,
        String last_name,
        String username,
        String email,
        String password,
        Role role
) {
}
