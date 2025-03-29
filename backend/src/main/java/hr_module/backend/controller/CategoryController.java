package hr_module.backend.controller;

import hr_module.backend.model.primary.Category;
import hr_module.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getAll")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Category category) {
        try {
            Category savedCategory = categoryService.saveCategory(category);
            return ResponseEntity.ok(savedCategory);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
