package com.helloevent.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Status {
    OPENED, CLOSED;

    @JsonCreator
    public static Status fromString(String key) {
        try {
            return Status.valueOf(key.toUpperCase());
        } catch (Exception e) {
            return null;
        }

    }

    @JsonValue
    public String getValue() {
        return name();
    }
}
