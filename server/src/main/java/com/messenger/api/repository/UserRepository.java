package com.messenger.api.repository;

import com.messenger.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    @Query(value = """
            SELECT u.*
            FROM users u
            JOIN subscriptions s1 ON u.id = s1.user_id
            JOIN subscriptions s2 ON u.id = s2.subscriber_id
            WHERE s1.subscriber_id = :userId
            AND s2.user_id = :userId
            """, nativeQuery = true)
    List<User> getUserFriends(@Param("userId") Long userId);

    @Query(value = """
            SELECT u.*
            FROM users u
            JOIN subscriptions s1 ON u.id = s1.user_id
            LEFT JOIN subscriptions s2 ON u.id = s2.subscriber_id AND s2.user_id = :userId
            WHERE s1.subscriber_id = :userId
            AND s2.user_id IS NULL
            """, nativeQuery = true)
    List<User> getUserSubscriptions(@Param("userId") Long userId);

    @Query(value = """
            SELECT u.*
            FROM users u
            JOIN subscriptions s1 ON u.id = s1.subscriber_id
            LEFT JOIN subscriptions s2 ON u.id = s2.user_id AND s2.subscriber_id = :userId
            WHERE s1.user_id = :userId
            AND s2.subscriber_id IS NULL
            """, nativeQuery = true)
    List<User> getUserSubscribers(@Param("userId") Long userId);

    @Query(value = """
            SELECT u.*
            FROM users u
            WHERE LOWER(u.nickname) LIKE LOWER(:userNick)
            """, nativeQuery = true)
    List<User> getUsersByNick(@Param("userNick") String userNick);
}
