package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.primary.Interview;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Integer> {
    List<Interview> findByCandidate (Candidate candidate);
    List<Interview> findByFirstInterviewer (Employee employee);
    List<Interview> findBySecondInterviewer (Employee employee);
    List<Interview> findByThirdInterviewer (Employee employee);

    @Modifying
    @Transactional
    @Query ("DELETE FROM Interview in WHERE in.candidate = :candidate")
    void deleteByCandidate (Candidate candidate);
}
