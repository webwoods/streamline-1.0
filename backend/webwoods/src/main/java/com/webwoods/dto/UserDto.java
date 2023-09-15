package com.webwoods.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private int id;
    private String fullName;
    private String email;
    private String gender;
    private String dob;
    private String presentAddress;
    private String permanentAddress;
}
