package com.clinic.clinic.repository;

import com.clinic.clinic.model.News;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE News n SET n.views = n.views + 1 WHERE n.id = ?1")
    void incrementViews(Long id);
}
