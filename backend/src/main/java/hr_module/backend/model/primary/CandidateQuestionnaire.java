package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table (name = "candidate_questionnaire")
public class CandidateQuestionnaire {
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "candidate_questionnaire_id")
    private int id;

    @ManyToOne
    @JoinColumn (name = "question_id_fk", referencedColumnName = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn (name = "candidate_id_fk", referencedColumnName = "candidate_id")
    private Candidate candidate;
}
