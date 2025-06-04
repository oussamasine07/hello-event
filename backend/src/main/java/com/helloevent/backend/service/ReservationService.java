package com.helloevent.backend.service;

import com.helloevent.backend.dto.ReservationDTO;
import com.helloevent.backend.dto.ReservationResultDTO;
import com.helloevent.backend.mapper.ReservationResultMapper;
import com.helloevent.backend.model.Event;
import com.helloevent.backend.model.Reservation;
import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.ReservationRepository;
import com.helloevent.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final EventService eventService;

    private final JwtService jwtService;

    private final ReservationResultMapper reservationResultMapper;

    public ReservationService (
            final ReservationRepository reservationRepository,
            final UserRepository userRepository,

            final JwtService jwtService,
            final EventService eventService,

            final ReservationResultMapper reservationResultMapper
    ) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;

        this.eventService = eventService;
        this.jwtService = jwtService;

        this.reservationResultMapper = reservationResultMapper;
    }



    public Reservation createReservation (ReservationDTO reservationDTO, String token) {
        // get auth user
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        // get event
        Event event = eventService.showEvent(reservationDTO.event_id()).orElseThrow();

        // get reservation by user_id and event_id
        Reservation reservation = reservationRepository.getReservationByUserIdAndByEventId(user.getId(), event.getId());

        if (reservation != null ) {
            throw new Error(" you already reserved for this event");
        } else {
            // register a reservation
            Reservation newReservation = new Reservation();
            newReservation.setEvent(event);
            newReservation.setUser(user);

            // decrement number of places in event
            eventService.decrementNumberOfPlaces(reservationDTO.event_id());

            return reservationRepository.save(newReservation);
        }
    }

    public List<ReservationResultDTO> getReservationsByUserId (Long userId ) {
        return reservationRepository.getReservationByUserId( userId )
                .stream()
                .map(this.reservationResultMapper::toDTO)
                .collect(Collectors.toList());
    }

}










