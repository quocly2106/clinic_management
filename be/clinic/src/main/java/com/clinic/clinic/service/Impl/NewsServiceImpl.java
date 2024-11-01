package com.clinic.clinic.service.Impl;

import com.clinic.clinic.dto.NewsDto;
import com.clinic.clinic.exception.ResourceNotFoundException;
import com.clinic.clinic.model.Admin;
import com.clinic.clinic.model.News;
import com.clinic.clinic.repository.AdminRepository;
import com.clinic.clinic.repository.NewsRepository;
import com.clinic.clinic.service.NewsService;
import com.clinic.clinic.utils.ImageUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ImageUpload imageUpload;

    @Override
    public News addNews(NewsDto newsDto, MultipartFile imageFile) {
        News news = new News();
        news.setTitle(newsDto.getTitle());
        news.setContent(newsDto.getContent());
        LocalDateTime now = LocalDateTime.now();
        news.setCreatedAt(now);
        news.setUpdatedAt(now);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // Lấy email từ token

        // Tìm Admin theo email
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + email));

        // Gán author cho news
        news.setAuthor(admin);
        news.setStatus(newsDto.getStatus());
        news.setCategory(newsDto.getCategory());
        news.setViews(0);

        if (imageFile != null && !imageFile.isEmpty()) {
            boolean isUploaded = imageUpload.uploadImage(imageFile);
            if (isUploaded) {
                news.setImage("/static/img/" + imageFile.getOriginalFilename()); // URL ảnh
            }
        }

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
    public News getNewsByIdProfile(Long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("News not found with ID: " + id));
    }

    @Override
    public void incrementViews(Long id) {
        newsRepository.incrementViews(id);
    }

}
