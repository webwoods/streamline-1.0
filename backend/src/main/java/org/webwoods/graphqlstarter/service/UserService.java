package org.webwoods.graphqlstarter.service;

import org.webwoods.graphqlstarter.domain.UserEntity;
import org.webwoods.graphqlstarter.dto.UserDto;

import java.util.List;

// The line `public interface UserService {` is declaring an interface named `UserService`. An
// interface in Java is a collection of abstract methods that can be implemented by classes. In this
// case, the `UserService` interface defines the contract for a service that deals with user-related
// operations. It declares three methods: `createUser`, `findById`, and `findAll`, which are expected
// to be implemented by classes that implement this interface.
public interface UserService {
    UserEntity createUser(UserDto userDto);
    UserEntity findById(Integer id);
    List<UserEntity> findAll();
}
