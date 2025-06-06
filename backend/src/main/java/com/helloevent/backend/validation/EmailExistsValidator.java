package com.helloevent.backend.validation;

import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailExistsValidator implements ConstraintValidator<EmailExists, String> {

    private final UserRepository userRepository;

    public EmailExistsValidator (
        final UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        User foundUser = userRepository.findUserByEmail(username);
        return foundUser == null;
    }
}
