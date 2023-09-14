package org.webwoods.graphqlstarter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
/**
 * The UserDto class is a data transfer object that represents a user.
 */
public class UserDto {
    private int id;
    private String fullName;
    private String email;
    private String gender;
    private String dob;
    private String presentAddress;
    private String permanentAddress;

    public UserDto() {
    }

    public UserDto(int id, String fullName, String email, String gender, String dob, String presentAddress, String permanentAddress) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.gender = gender;
        this.dob = dob;
        this.presentAddress = presentAddress;
        this.permanentAddress = permanentAddress;
    }

    public UserDto(String email, String fullName, String presentAddress, String permanentAddress, String gender, String dob) {
        this.fullName = fullName;
        this.email = email;
        this.gender = gender;
        this.dob = dob;
        this.presentAddress = presentAddress;
        this.permanentAddress = permanentAddress;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getPresentAddress() {
        return presentAddress;
    }

    public void setPresentAddress(String presentAddress) {
        this.presentAddress = presentAddress;
    }

    public String getPermanentAddress() {
        return permanentAddress;
    }

    public void setPermanentAddress(String permanentAddress) {
        this.permanentAddress = permanentAddress;
    }
}
