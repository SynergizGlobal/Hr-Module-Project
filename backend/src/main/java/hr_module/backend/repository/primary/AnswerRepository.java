package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Answer;
import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Question;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    public List<Answer> findByCandidate (Candidate candidate);

    @Modifying
    @Transactional
    @Query("DELETE FROM Answer a WHERE a.question = :question AND a.candidate = :candidate")
    void deleteByQuestionAndCandidate (Question question, Candidate candidate);
}
