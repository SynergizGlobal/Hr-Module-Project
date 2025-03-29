package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.ModeOfEducation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeOfEducationRepository extends JpaRepository<ModeOfEducation, Integer> {

}
