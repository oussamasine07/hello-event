package com.helloevent.backend.dto;

import java.time.LocalDate;

public record ReservationResultDTO(
        Long id,
        int placeNumber,
        LocalDate dateOfReservation,
        EventResultDTO event
) {
}
