package com.webwoods.service;

import com.webwoods.dto.UserDto;
import com.webwoods.dto.UserUpdateDto;
import com.webwoods.entity.UserEntity;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public interface UserService {
    String createUser(UserDto userDto);
    UserEntity findById(Integer id);

    List<UserEntity> findAll();

    String deleteUser(Integer id);

    String updateUser(UserUpdateDto userUpdate);
}