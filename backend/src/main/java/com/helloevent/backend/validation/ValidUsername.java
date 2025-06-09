package com.helloevent.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ValidUsernameValidator.class)
public @interface ValidUsername {

    String message() default "this user does not exist";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
