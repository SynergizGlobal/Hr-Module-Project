package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private int answerId;

    @Column(name = "answer", length = 2000)
    private String answer;

    @ManyToOne
    @JoinColumn (name = "question_id_fk", referencedColumnName = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn (name = "candidate_id_fk", referencedColumnName = "candidate_id")
    private Candidate candidate;

    public Answer() {
    }

    public Answer(String answer, Question question, Candidate candidate) {
        this.answer = answer;
        this.question = question;
        this.candidate = candidate;
    }

}
