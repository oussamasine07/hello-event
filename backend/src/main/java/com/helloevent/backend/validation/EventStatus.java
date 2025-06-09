package com.helloevent.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = EventStatusValidator.class)
public @interface EventStatus {

    String message() default "invalid event Status, only allowed: OPENED, CLOSED";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
