package com.helloevent.backend.dto;

import com.helloevent.backend.model.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record AuthUserDTO(
        Long id,
        String firstName,
        String lastName,
        String username,
        String email,
        Role role
) {
}
