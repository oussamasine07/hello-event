package com.helloevent.backend.dto;

public record UpdateProfileDTO(
        String firstName,
        String lastName,
        String username,
        String email
) {

}
