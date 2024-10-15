package com.clinic.clinic.service;

import com.clinic.clinic.dto.NewsDto;
import com.clinic.clinic.model.News;

import java.util.List;

public interface NewsService {
    News addNews(NewsDto newsDto);
    News updateNews(Long id, NewsDto newsDto);
    void deleteNews(Long id);
    List<News> getAllNews();
    News getNewsById(Long id);

    void incrementViews(Long id);
}
