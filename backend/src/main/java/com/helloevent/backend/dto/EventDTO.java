package com.helloevent.backend.dto;

import com.helloevent.backend.model.Status;

import java.util.Date;

public record EventDTO(
        String name,
        String description,
        String place,
        Date eventDate,
        int numberOfPlaces,
        Status status,
        Long category_id
) {
}
