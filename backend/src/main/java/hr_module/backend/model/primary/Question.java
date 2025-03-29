package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private int questionId;

    @Column(name = "question", length = 1000)
    private String question;

    @ManyToOne
    @JoinColumn(name = "job_title_id_fk", referencedColumnName = "job_title_id")
    private JobTitle jobTitle;

    public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public JobTitle getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(JobTitle jobTitle) {
		this.jobTitle = jobTitle;
	}

	public Question() {
    }

    public Question(String question, JobTitle jobTitle, Boolean isDefault) {
        this.question = question;
        this.jobTitle = jobTitle;
    }
}
