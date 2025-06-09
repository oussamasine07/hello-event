package com.helloevent.backend.validation;

import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UsernameExistsValidator implements ConstraintValidator<UsernameExists, String> {

    private final UserRepository userRepository;

    public UsernameExistsValidator (
            final UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext) {
        User foundUser = userRepository.findUserByUsername( username );
        return foundUser == null;
    }
}
