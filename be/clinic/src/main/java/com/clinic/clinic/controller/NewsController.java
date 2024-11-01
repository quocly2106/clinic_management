package com.clinic.clinic.controller;

import com.clinic.clinic.dto.NewsDto;
import com.clinic.clinic.model.News;
import com.clinic.clinic.service.NewsService;
import com.clinic.clinic.utils.ImageUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')") // Chỉ cho phép Admin thêm bài viết
    public ResponseEntity<News> createNews(
            @RequestPart("news") NewsDto newsDto,  // Sử dụng @RequestPart để nhận dữ liệu JSON
            @RequestPart("imageFile") MultipartFile imageFile) { // Sử dụng @RequestPart cho tệp tin

        News createdNews = newsService.addNews(newsDto, imageFile);
        return ResponseEntity.ok(createdNews);
    }


    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Chỉ cho phép Admin cập nhật bài viết
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody NewsDto newsDto) {
        News updatedNews = newsService.updateNews(id, newsDto);
        return ResponseEntity.ok(updatedNews);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Chỉ cho phép Admin xóa bài viết
    public ResponseEntity<String> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok("News deleted successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<News>> getAllNews() {
        List<News> newsList = newsService.getAllNews();
        return ResponseEntity.ok(newsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        newsService.incrementViews(id); // Tăng lượt xem trước khi lấy bài viết
        News news = newsService.getNewsByIdProfile(id);
        return ResponseEntity.ok(news);
    }

//    @GetMapping("views/{id}")
//    public ResponseEntity<News> getNewsByIdProfile(@PathVariable Long id) {
//        newsService.incrementViews(id); // Tăng lượt xem trước khi lấy bài viết
//        News news = newsService.getNewsById(id);
//        return ResponseEntity.ok(news);
//    }

    @GetMapping("/increment-views/{id}")
    public ResponseEntity<String> incrementNewsViews(@PathVariable Long id) {
        newsService.incrementViews(id);
        return ResponseEntity.ok("Views incremented successfully");
    }
}
