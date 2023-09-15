package com.webwoods.controller;


import com.webwoods.dto.UserDto;
import com.webwoods.dto.UserUpdateDto;
import com.webwoods.entity.UserEntity;
import com.webwoods.service.UserService;
import com.webwoods.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;


import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @MutationMapping
    public ResponseEntity<StandardResponse> createUser(@Argument UserDto userDto) {
        String message = userService.createUser(userDto);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Success",null,null,message), HttpStatus.CREATED
        );
    }

    @MutationMapping
    public ResponseEntity<StandardResponse> deleteUser(@Argument Integer id){
        String message = userService.deleteUser(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",null,null,message), HttpStatus.OK
        );
    }

    @MutationMapping
    public ResponseEntity<StandardResponse> updateUser(@Argument UserUpdateDto userUpdate){
        String message = userService.updateUser(userUpdate);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",null,null,message), HttpStatus.OK
        );
    }

    @QueryMapping
    public ResponseEntity<StandardResponse> userAll() {
        List<UserEntity> userEntityList = userService.findAll();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",null,userEntityList,""), HttpStatus.OK
        );
    }

    @QueryMapping
    public ResponseEntity<StandardResponse> userById(@Argument Integer id) {
        UserEntity userEntity = userService.findById(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",userEntity,null,""), HttpStatus.OK
        );
    }
}
