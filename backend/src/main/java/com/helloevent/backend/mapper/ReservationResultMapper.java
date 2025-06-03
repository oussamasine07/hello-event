package com.helloevent.backend.mapper;

import com.helloevent.backend.dto.ReservationResultDTO;
import com.helloevent.backend.model.Reservation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReservationResultMapper {
    Reservation toEntity(ReservationResultDTO reservationResultDTO);
    ReservationResultDTO toDTO( Reservation reservation );
}
