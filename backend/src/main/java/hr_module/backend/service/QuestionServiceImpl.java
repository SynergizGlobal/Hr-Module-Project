package hr_module.backend.service;

import hr_module.backend.model.primary.Question;
import hr_module.backend.repository.primary.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question saveQuestion(Question question) {
        return questionRepository.save (question);
    }

    @Override
    public List<Question> getQuestionsByJobTitleId(Integer jobTitleId) {
        return questionRepository.findByJobTitleId(jobTitleId);
    }

    @Override
    public Question getById(Integer id) {
        return questionRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException( ("Question not found")));
    }

    @Override
    public void deleteQuestionById (Integer id) {
        questionRepository.deleteById(id);
    }
}
