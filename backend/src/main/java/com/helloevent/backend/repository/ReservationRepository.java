package com.helloevent.backend.repository;

import com.helloevent.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // ger reservations by user_id and event_id
    @Query(value = "select * from reservations where user_id = ? and event_id = ?", nativeQuery = true)
    public Reservation getReservationByUserIdAndByEventId(Long userId, Long eventId);

    // get reservations by user_id
    public List<Reservation> getReservationByUserId(Long userId);

}
