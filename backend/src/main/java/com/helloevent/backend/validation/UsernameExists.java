package com.helloevent.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = UsernameExistsValidator.class)
public @interface UsernameExists {

    String message() default "this username is alredy taken";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
