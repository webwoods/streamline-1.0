package com.webwoods.repository;

import com.webwoods.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    @Override
    List<UserEntity> findAll();

    Optional<UserEntity> findById(Integer id);
}
