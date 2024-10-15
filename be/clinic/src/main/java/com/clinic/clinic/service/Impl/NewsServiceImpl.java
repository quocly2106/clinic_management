package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.NewsDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Admin;
import com.clinic.clinic.model.News;
import com.clinic.clinic.repository.AdminRepository;
import com.clinic.clinic.repository.NewsRepository;
import com.clinic.clinic.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public News addNews(NewsDto newsDto) {
        News news = new News();
        news.setTitle(newsDto.getTitle());
        news.setContent(newsDto.getContent());
        LocalDateTime now = LocalDateTime.now();
        news.setCreatedAt(now);
        news.setUpdatedAt(now);

        if (newsDto.getAuthorId() != null) {
            Admin admin = adminRepository.findById(newsDto.getAuthorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Admin not found with ID: " + newsDto.getAuthorId()));
            news.setAuthor(admin);
        } else {
            throw new IllegalArgumentException("Author ID must not be null");
        }

        news.setStatus(newsDto.getStatus());
        news.setImage(newsDto.getImage()); // Đảm bảo thuộc tính đúng
        news.setTags(newsDto.getTags());
        news.setCategory(newsDto.getCategory());
        news.setViews(0); // Khởi tạo lượt xem bằng 0

        return newsRepository.save(news);
    }

    @Override
    public News updateNews(Long id, NewsDto newsDto) {
        News existingNews = newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found with ID: " + id));

        existingNews.setTitle(newsDto.getTitle());
        existingNews.setContent(newsDto.getContent());
        existingNews.setUpdatedAt(LocalDateTime.now()); // Cập nhật thời gian sửa đổi
        existingNews.setStatus(newsDto.getStatus());
        existingNews.setImage(newsDto.getImage()); // Đảm bảo thuộc tính đúng
        existingNews.setTags(newsDto.getTags());
        existingNews.setCategory(newsDto.getCategory());

        return newsRepository.save(existingNews);
    }

    @Override
    public void deleteNews(Long id) {
        if (!newsRepository.existsById(id)) {
            throw new ResourceNotFoundException("News not found with ID: " + id);
        }
        newsRepository.deleteById(id);
    }

    @Override
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public News getNewsById(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found with ID: " + id));
    }

    @Override
    public void incrementViews(Long id) {
        newsRepository.incrementViews(id);
    }

}
