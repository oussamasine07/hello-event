package com.helloevent.backend.dto;

import com.helloevent.backend.model.Role;
import com.helloevent.backend.validation.EmailExists;
import com.helloevent.backend.validation.UsernameExists;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(
        @NotBlank(message = "firstname is required")
        String first_name,

        @NotBlank(message = "lastname is required")
        String last_name,

        @NotBlank(message = "username is required")
        @UsernameExists
        String username,

        @NotBlank(message = "email is required")
        @Email(message = "please enter a valide email")
        @EmailExists
        String email,

        @NotBlank(message = "password is resuired")
        @Min(value = 6, message = "password should be at least 6 charachters")
        String password,

        @NotNull(message = "role is required")
        Role role
) {

}
