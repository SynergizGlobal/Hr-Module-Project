package hr_module.backend.service;

import hr_module.backend.model.primary.Category;

import java.util.List;

public interface CategoryService {
    public Category saveCategory (Category category);

    public List<Category> getAllCategories();

    public Category getOrCreateCategory (String name);
}
