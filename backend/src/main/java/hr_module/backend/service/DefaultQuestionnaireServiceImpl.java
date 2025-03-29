package hr_module.backend.service;

import hr_module.backend.model.primary.DefaultQuestionnaire;
import hr_module.backend.model.primary.Job;
import hr_module.backend.model.primary.Question;
import hr_module.backend.repository.primary.DefaultQuestionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DefaultQuestionnaireServiceImpl implements DefaultQuestionnaireService {
    @Autowired
    private DefaultQuestionnaireRepository defaultQuestionnaireRepository;

    @Override
    public DefaultQuestionnaire saveDefaultQuestionnaire(DefaultQuestionnaire defaultQuestionnaire) {
        return defaultQuestionnaireRepository.save(defaultQuestionnaire);
    }

    @Override
    public List<Question> getQuestionsByJob(Job job) {
        List<DefaultQuestionnaire> questionnaires = defaultQuestionnaireRepository.findByJob(job);
        return questionnaires.stream()
                             .map(DefaultQuestionnaire::getQuestion)
                             .collect(Collectors.toList());
    }

    @Override
    public void deleteByJob (Job job) {
        defaultQuestionnaireRepository.deleteByJob (job);
    }
}
