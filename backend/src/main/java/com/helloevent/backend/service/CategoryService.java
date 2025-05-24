package com.helloevent.backend.service;

import com.helloevent.backend.model.Category;
import com.helloevent.backend.model.Role;
import com.helloevent.backend.model.User;
import com.helloevent.backend.repository.CategoryRepository;
import com.helloevent.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    private final JwtService jwtService;

    public CategoryService (
            final CategoryRepository categoryRepository,
            final UserRepository userRepository,
            final JwtService jwtService
    ) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;

        this.jwtService = jwtService;
    }

    public List<Category> getAllCategories () {
        return categoryRepository.findAll();
    }

    public Category getCategoryById ( Long id ) {
        return categoryRepository.findById(id).orElseThrow();
    }

    public Category createCategory ( Category category, String token) {
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        if (user.getRole() == Role.ADMIN) {
            return categoryRepository.save(category);
        } else {
            throw new Error("unauthorozied action");
        }

    }

    public Category updateCategory ( Category category, String token, Long id ) {
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        if (user.getRole() == Role.ADMIN) {
            Category updatedCategory = categoryRepository.findById(id).orElseThrow();
            updatedCategory.setName(category.getName());

            return categoryRepository.save(updatedCategory);
        } else {
            throw new Error("unauthorozied action");
        }
    }

    public void deleteCategory (String token, Long id) {
        String usernameFromToken = jwtService.extarctUsername(token.substring(7));
        User user = userRepository.getUserByUsernameOrByEmail(usernameFromToken);

        if (user.getRole() == Role.ADMIN) {
             categoryRepository.deleteById(id);
        } else {
            throw new Error("unauthorozied action");
        }
    }



}
