package hr_module.backend.service;

import hr_module.backend.model.primary.DefaultQuestionnaire;
import hr_module.backend.model.primary.Job;
import hr_module.backend.model.primary.Question;

import java.util.List;

public interface DefaultQuestionnaireService {
    public DefaultQuestionnaire saveDefaultQuestionnaire (DefaultQuestionnaire defaultQuestionnaire);

    public List<Question> getQuestionsByJob (Job job);

    public void deleteByJob (Job job);
}
