package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.CandidateQuestionnaire;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateQuestionnaireRepository extends JpaRepository<CandidateQuestionnaire, Integer> {
    List<CandidateQuestionnaire> findByCandidate (Candidate candidate);

    @Modifying
    @Transactional
    @Query("DELETE FROM CandidateQuestionnaire cq WHERE cq.candidate = :candidate")
    void deleteByCandidate(Candidate candidate);
}
