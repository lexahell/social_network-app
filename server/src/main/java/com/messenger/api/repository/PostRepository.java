package com.messenger.api.repository;

import com.messenger.api.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Репозиторий постов
 */
public interface PostRepository extends JpaRepository<Post, Long> {
}
