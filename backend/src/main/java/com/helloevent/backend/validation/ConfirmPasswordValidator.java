package com.helloevent.backend.validation;

import com.helloevent.backend.dto.RegisterDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;

public class ConfirmPasswordValidator implements ConstraintValidator<ConfirmPassword, Object> {

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext constraintValidatorContext) {
//        if (registerDTO == null) {
//            return true; // Ignore validation if the object is null
//        }
//
//        if (!registerDTO.password().equals(registerDTO.confirmPassword())) {
//            // ⚠️ This makes the error appear under "confirmPassword" instead of the class
//            constraintValidatorContext.disableDefaultConstraintViolation();
//            constraintValidatorContext.buildConstraintViolationWithTemplate("Passwords do not match")
//                    .addPropertyNode("confirmPassword") // Associate error with confirmPassword field
//                    .addConstraintViolation();
//
//            return false;
//        }

        try {
            BeanWrapperImpl wrapper = new BeanWrapperImpl(obj);
            String password = (String) wrapper.getPropertyValue("password");
            String confirmPassword = (String) wrapper.getPropertyValue("confirmPassword");

            if (password == null || confirmPassword == null || password.isBlank() || confirmPassword.isBlank()) {
                return true;
            }

            boolean isMatch = password.equals(confirmPassword);
            if (!isMatch) {
                constraintValidatorContext.disableDefaultConstraintViolation();
                constraintValidatorContext.buildConstraintViolationWithTemplate("Passwords do not match")
                        .addPropertyNode("confirmPassword") // Associate error with confirmPassword field
                        .addConstraintViolation();
            }

            return isMatch;
        }
        catch (Exception e) {
            return true;
        }
    }
}
