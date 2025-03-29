package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.CandidateStatus;
import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.primary.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    List<Candidate> findByCandidateStatus (CandidateStatus candidateStatus);

    @Query("SELECT c FROM Candidate c " +
            "LEFT JOIN Interview i ON i.candidate = c " +
            "WHERE (c.employee = :employee OR i.firstInterviewer = :employee OR i.secondInterviewer = :employee OR i.thirdInterviewer = :employee) ")
    List<Candidate> findCandidatesByEmployee (Employee employee);

    @Query("SELECT c FROM Candidate c " +
            "LEFT JOIN Interview i ON i.candidate = c " +
            "WHERE (c.employee = :employee OR i.firstInterviewer = :employee OR i.secondInterviewer = :employee OR i.thirdInterviewer = :employee) " +
            "AND c.candidateStatus = :status")
    List<Candidate> findCandidatesByEmployeeAndStatus(Employee employee, CandidateStatus status);

    @Query("SELECT c.candidateStatus, COUNT(c) FROM Candidate c WHERE c.job = :job GROUP BY c.candidateStatus")
    List<Object> countCandidateStatusByJob(@Param("job") Job job);
}
