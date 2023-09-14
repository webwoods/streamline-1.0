package org.webwoods.graphqlstarter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.webwoods.graphqlstarter.domain.UserEntity;
import java.util.List;

@Repository
// The line `public interface UserRepository extends CrudRepository<UserEntity, Integer>` is declaring
// an interface called `UserRepository` that extends the `CrudRepository` interface.
public interface UserRepository extends CrudRepository<UserEntity, Integer> {
    @Override
    List<UserEntity> findAll();
}
