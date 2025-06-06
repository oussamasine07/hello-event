package com.helloevent.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = UserRoleValidator.class)
public @interface UserRole {

    String message() default "unauthorized Role, allowed only: CLIENT, ADMIN";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
