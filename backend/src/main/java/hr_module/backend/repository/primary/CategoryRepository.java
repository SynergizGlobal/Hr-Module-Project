package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByName(String name); // Return List instead of Optional
    boolean existsByName(String name);

}
