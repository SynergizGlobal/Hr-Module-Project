package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table (name = "default_questionnaire")
public class DefaultQuestionnaire {
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

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "default_id")
    private int id;

    @ManyToOne
    @JoinColumn (name = "question_id_fk", referencedColumnName = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn (name = "job_id_fk", referencedColumnName = "job_id")
    private Job job;

    public DefaultQuestionnaire() {
    }

    public DefaultQuestionnaire(Question question, Job job) {
        this.question = question;
        this.job = job;
    }
}
