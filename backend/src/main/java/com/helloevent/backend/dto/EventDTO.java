package com.helloevent.backend.dto;

import com.helloevent.backend.model.Category;
import com.helloevent.backend.model.Status;
import com.helloevent.backend.validation.EventStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Date;

public record EventDTO(
        Long id,
        @NotBlank(message = "name is required")
        String name,

        @NotBlank(message = "description is required")
        String description,

        @NotBlank(message = "place is required")
        String place,

        @NotNull(message = "event date is required")
        LocalDate eventDate,

        @Min(value = 1, message = "number of places should be no less than 1")
        int numberOfPlaces,

        @EventStatus
        //@NotNull(message = "status is required")
        Status status,

        @NotNull(message = "category is required")
        Long category_id
) {
}
