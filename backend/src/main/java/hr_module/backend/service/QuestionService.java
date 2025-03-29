package hr_module.backend.service;

import hr_module.backend.model.primary.Question;

import java.util.List;

public interface QuestionService {
    public Question saveQuestion (Question question);

    public List<Question> getQuestionsByJobTitleId (Integer jobTitleId);

    public Question getById (Integer id);

    public void deleteQuestionById (Integer id);
}
