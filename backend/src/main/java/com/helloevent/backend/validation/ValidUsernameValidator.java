package com.helloevent.backend.validation;

import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidUsernameValidator implements ConstraintValidator<ValidUsername, String> {

    private final UserRepository userRepository;

    public ValidUsernameValidator (
            final UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String usernameOrEmail, ConstraintValidatorContext constraintValidatorContext) {
        User foundUser = userRepository.getUserByUsernameOrByEmail( usernameOrEmail );

        return foundUser != null;
    }
}
