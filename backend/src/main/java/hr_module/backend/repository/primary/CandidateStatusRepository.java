package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.CandidateStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateStatusRepository extends JpaRepository<CandidateStatus, Integer> {
}
