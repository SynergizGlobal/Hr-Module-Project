package hr_module.backend.service;

import hr_module.backend.model.primary.Category;
import hr_module.backend.repository.primary.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(Category category) {
        if (category.getName() == null || category.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be null or empty");
        }

        // Check for multiple existing categories with the same name
        List<Category> existingCategories = categoryRepository.findByName(category.getName());
        if (!existingCategories.isEmpty()) {
            throw new IllegalArgumentException("Category already exists: " + category.getName());
        }

        return categoryRepository.save(category);
    }
    
    
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    @Override
    public Category getOrCreateCategory(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Category name cannot be null or empty");
        }

        List<Category> existingCategories = categoryRepository.findByName(name);
        if (!existingCategories.isEmpty()) {
            return existingCategories.get(0); // Return the first found category
        }

        return categoryRepository.save(new Category(name));
    }
}
