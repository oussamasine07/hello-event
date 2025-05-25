package com.helloevent.backend.controller;

import com.helloevent.backend.dto.ReservationDTO;
import com.helloevent.backend.model.Reservation;
import com.helloevent.backend.service.ReservationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservation")
@CrossOrigin
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController (
            final ReservationService reservationService
    ) {
        this.reservationService = reservationService;
    }


    @PostMapping
    public Reservation create (@RequestBody ReservationDTO reservationDTO, @RequestHeader("Authorization") String token) {
        return reservationService.createReservation(reservationDTO, token);
    }

}
