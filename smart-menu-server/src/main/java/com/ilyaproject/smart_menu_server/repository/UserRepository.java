package com.ilyaproject.smart_menu_server.repository;

import com.ilyaproject.smart_menu_server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Query("SELECT u FROM User u JOIN FETCH u.profileInformation JOIN FETCH u.menuSettings JOIN FETCH u.recipes")
    List<User> findAllWithAllRelations();
}
