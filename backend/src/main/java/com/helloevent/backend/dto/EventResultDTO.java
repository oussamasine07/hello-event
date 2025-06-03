package com.helloevent.backend.dto;

import com.helloevent.backend.model.Category;

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
