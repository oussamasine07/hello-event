package com.helloevent.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = EmailExistsValidator.class)
public @interface EmailExists {
    String message() default "this email is already used";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
