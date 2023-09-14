package org.webwoods.graphqlstarter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.webwoods.graphqlstarter.domain.UserEntity;
import org.webwoods.graphqlstarter.dto.UserDto;
import org.webwoods.graphqlstarter.service.UserService;
import java.util.List;

/**
 * The UserController class is a Java controller that handles requests related to user operations, such
 * as creating a new user and retrieving all users.
 */
@Controller
public class UserController {
    @Autowired
    private UserService userService;
    @MutationMapping
    public UserEntity createUser(@Argument UserDto userDto) {
        try {
            return userService.createUser(userDto);
        }catch (Exception e){
            throw e;
        }
    }
    @QueryMapping
    public List<UserEntity> userAll() {
        return userService.findAll();
    }
}