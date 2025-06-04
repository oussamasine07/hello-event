package com.helloevent.backend.dto;

public record ChangePasswordDTO(
        String oldPassword,
        String newPassword,
        String confirmPassword
) {
}
