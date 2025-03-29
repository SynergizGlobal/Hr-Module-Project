package hr_module.backend.service;

import hr_module.backend.model.primary.Answer;
import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Question;
import hr_module.backend.repository.primary.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService{
    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    @Override
    public List<Answer> getAnswersByCandidate(Candidate candidate) {
        return answerRepository.findByCandidate (candidate);
    }

    @Override
    public void deleteAnswerByQuestionAndCandidate (Question question, Candidate candidate) {
        answerRepository.deleteByQuestionAndCandidate(question, candidate);
    }
}
