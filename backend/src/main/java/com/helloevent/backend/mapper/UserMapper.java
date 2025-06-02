package com.helloevent.backend.mapper;

import com.helloevent.backend.dto.AuthUserDTO;
import com.helloevent.backend.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(AuthUserDTO authUserDTO);
    AuthUserDTO toDTO(User user);
}
