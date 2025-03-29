package hr_module.backend.service;

import hr_module.backend.model.primary.Answer;
import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Question;

import java.util.List;

public interface AnswerService {
    public Answer saveAnswer (Answer answer);

    public List<Answer> getAnswersByCandidate (Candidate candidate);

    public void deleteAnswerByQuestionAndCandidate (Question question, Candidate candidate);
}
