package com.helloevent.backend.service;

import com.helloevent.backend.dto.ReservationDTO;
import com.helloevent.backend.model.Event;
import com.helloevent.backend.model.Reservation;
import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.ReservationRepository;
import com.helloevent.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final EventService eventService;

    private final JwtService jwtService;

    public ReservationService (
            final ReservationRepository reservationRepository,
            final UserRepository userRepository,

            final JwtService jwtService,
            final EventService eventService
    ) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;

        this.eventService = eventService;
        this.jwtService = jwtService;
    }



    public Reservation createReservation (ReservationDTO reservationDTO, String token) {
        // get auth user
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        // get event
        Event event = eventService.showEvent(reservationDTO.event_id()).orElseThrow();

        // register a reservation
        Reservation newReservation = new Reservation();
        newReservation.setEvent(event);
        newReservation.setUser(user);

        // decrement number of places in event
        eventService.decrementNumberOfPlaces(reservationDTO.event_id());

        return reservationRepository.save(newReservation);
    }

}
