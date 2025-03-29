package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
	boolean existsByName(String name); // This checks if a project with the given name exists
}
