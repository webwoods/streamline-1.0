package com.webwoods.service.impl;

import com.webwoods.dto.UserDto;
import com.webwoods.dto.UserUpdateDto;
import com.webwoods.entity.UserEntity;
import com.webwoods.repository.UserRepository;
import com.webwoods.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public String createUser(UserDto userDto) {
        UserEntity userEntity = modelMapper.map(userDto,UserEntity.class);
        if(!userRepository.existsById(userEntity.getId())){
            userRepository.save(userEntity);
            return userEntity.getFullName() + " Saved Successfully";
        }else{
            throw new DuplicateKeyException("Alraedy added");
        }
    }

    @Override
    public UserEntity findById(Integer id) {
        Optional<UserEntity> userEntityOptional = userRepository.findById(id);
        return userEntityOptional.orElse(null);
    }

    @Override
    public List<UserEntity> findAll() {
        System.out.println("findall");
        return userRepository.findAll();
    }

    @Override
    public String deleteUser(Integer id) {
        if (userRepository.existsById(id)){
            userRepository.deleteById(id);
            return "Deleted Successfully" + id;
        }
        else{
            throw new RuntimeException("No customer found");
        }
    }

    @Override
    public String updateUser(UserUpdateDto userUpdate) {
        if(userRepository.existsById(userUpdate.getId())){

        }
        return null;
    }

}
