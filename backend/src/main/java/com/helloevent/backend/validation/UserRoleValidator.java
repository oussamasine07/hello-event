package com.helloevent.backend.validation;

import com.helloevent.backend.model.Role;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UserRoleValidator implements ConstraintValidator<UserRole, Role> {

    @Override
    public boolean isValid(Role role, ConstraintValidatorContext constraintValidatorContext) {
        if ( role == null ) return false;

        return role == Role.ADMIN || role == Role.CLIENT;
    }
}
