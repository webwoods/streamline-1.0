package org.webwoods.graphqlstarter.domain;

import javax.persistence.*;
import java.util.Collection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
// The `public class UserEntity` is a Java class that represents a user entity in a domain model. It is
// used to map user data to a database table using Java Persistence API (JPA) annotations. The class
// defines various attributes such as id, fullName, email, gender, dob, presentAddress, and
// permanentAddress, along with their corresponding getter and setter methods. It also includes
// constructors for creating instances of the UserEntity class with different sets of parameters.
public class UserEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "gender")
    private String gender;

    @Column(name = "dob")
    private String dob;

    @Column(name = "presentAddress")
    private String presentAddress;

    @Column(name = "permanentAddress")
    private String permanentAddress;

    public UserEntity() {
    }

    public UserEntity(int id, String fullName, String email, String gender, String dob, String presentAddress, String permanentAddress) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.gender = gender;
        this.dob = dob;
        this.presentAddress = presentAddress;
        this.permanentAddress = permanentAddress;
    }

    public UserEntity(String fullName, String email, String dob, String gender, String presentAddress, String permanentAddress) {
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

