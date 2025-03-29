package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobStatusRepository extends JpaRepository<JobStatus, Integer> {
}
