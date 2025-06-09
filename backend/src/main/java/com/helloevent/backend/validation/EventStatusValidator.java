package com.helloevent.backend.validation;

import com.helloevent.backend.model.Status;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EventStatusValidator implements ConstraintValidator<EventStatus, Status> {
    @Override
    public boolean isValid(Status status, ConstraintValidatorContext constraintValidatorContext) {
        System.out.println(status);
        if ( status == null ) return false;
        return status == Status.OPENED || status == Status.CLOSED;
    }
}
