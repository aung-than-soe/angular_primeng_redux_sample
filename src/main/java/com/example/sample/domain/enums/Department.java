package com.example.sample.domain.enums;

import lombok.Getter;

@Getter
public enum Department {

    SOFTWARE("Software Department"), SALE("Sale Department");

    String description;

    Department(String description) {
        this.description = description;
    }

}
