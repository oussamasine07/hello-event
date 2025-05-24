package com.helloevent.backend.controller;

import com.helloevent.backend.model.Category;
import com.helloevent.backend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController (
            final CategoryService categoryService
    ) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> index () {
        return categoryService.getAllCategories();
    }

    @PostMapping
    public Category create (@RequestBody Category category, @RequestHeader("Authorization") String token) {
        return categoryService.createCategory(category, token);
    }

    @PutMapping("/{id}")
    public Category update (@RequestBody Category category, @RequestHeader("Authorization") String token, @PathVariable Long id) {
        return categoryService.updateCategory(category, token, id);
    }

    @DeleteMapping("/{id}")
    public void delete (@RequestHeader("Authorization") String token, @PathVariable Long id) {
        categoryService.deleteCategory(token, id);
    }

}













