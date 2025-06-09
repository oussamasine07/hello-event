package com.helloevent.backend.exception;

public class PasswordIncorrectException extends RuntimeException{

    public PasswordIncorrectException ( String message ) {
        super( message );
    }

}
