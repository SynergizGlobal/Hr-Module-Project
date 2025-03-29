package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.DefaultQuestionnaire;
import hr_module.backend.model.primary.Job;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DefaultQuestionnaireRepository extends JpaRepository<DefaultQuestionnaire, Integer> {
    List<DefaultQuestionnaire> findByJob(Job job);

    @Modifying
    @Transactional
    @Query("DELETE FROM DefaultQuestionnaire dq WHERE dq.job = :job")
    void deleteByJob(Job job);
}
