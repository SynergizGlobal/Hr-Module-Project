package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QualificationRepository extends JpaRepository<Qualification, Integer> {
    Optional<Qualification> findByName (String name);
}
