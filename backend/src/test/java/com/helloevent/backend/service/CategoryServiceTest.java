package com.helloevent.backend.service;

import com.helloevent.backend.model.Category;
import com.helloevent.backend.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    CategoryRepository categoryRepository;

    @InjectMocks
    CategoryService categoryService;

    @Test
    void getAllCategories() {
        Category category = new Category();
        category.setName("one category");

        Category category1 = new Category();
        category1.setName("an other category");

        List<Category> categories = Arrays.asList(category, category1);

        Mockito.when(categoryRepository.findAll()).thenReturn(categories);

        List<Category> result = categoryService.getAllCategories();

        assertEquals(2, result.size());
    }

    @Test
    void getCategoryById() {
        Category category = new Category();
        category.setId(1L);
        category.setName("category 1");

        Mockito.when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));

        Category result = categoryService.getCategoryById(1L);

        assertEquals(1L, result.getId());
    }

    @Test
    void createCategory() {
        Category category = new Category();
        category.setName("category 1");

        Mockito.when(categoryRepository.save(category)).thenReturn(category);

        Category result = categoryService.createCategory(category, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3VmaSIsImlhdCI6MTc0ODIwNTk3MiwiZXhwIjoxNzQ4MjE0NjEyfQ.3GgkNuwghwbPj227TtDoMaaG50PrYBhSlUB_fcAFios");

        assertEquals(1L, result.getId());

    }

    @Test
    void updateCategory() {
    }

    @Test
    void deleteCategory() {
    }
}