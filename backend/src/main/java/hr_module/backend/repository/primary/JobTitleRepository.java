package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.JobTitle;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTitleRepository extends JpaRepository<JobTitle, Integer> {

	Optional<JobTitle> findByName(String name);
}
