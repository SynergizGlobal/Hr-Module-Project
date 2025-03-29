package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Discipline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Integer> {
    Optional<Discipline> findByName (String name);
}
