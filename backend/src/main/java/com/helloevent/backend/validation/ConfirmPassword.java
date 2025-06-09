package com.helloevent.backend.validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ConfirmPasswordValidator.class)
public @interface ConfirmPassword {

    String message() default "passwords don't match";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default  {};

}
