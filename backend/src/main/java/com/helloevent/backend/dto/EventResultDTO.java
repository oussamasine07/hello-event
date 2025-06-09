package com.helloevent.backend.dto;

import com.helloevent.backend.model.Category;
import com.helloevent.backend.validation.EventStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record EventResultDTO(
        Long id,
        String name,
        String description,
        String place,
        LocalDate eventDate,
        int numberOfPlaces,
        String status,
        Category category
) {
}
