package com.helloevent.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryDTO(
        @NotBlank(message = "category name is required")
        String name
) {
}
