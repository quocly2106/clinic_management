package com.clinic.clinic.service;

import com.clinic.clinic.dto.NewsDto;
import com.clinic.clinic.model.News;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NewsService {
    News addNews(NewsDto newsDto, MultipartFile imageFile);
    News updateNews(Long id, NewsDto newsDto);
    void deleteNews(Long id);
    List<News> getAllNews();
    News getNewsById(Long id);

    News getNewsByIdProfile(Long id);
    void incrementViews(Long id);
}
