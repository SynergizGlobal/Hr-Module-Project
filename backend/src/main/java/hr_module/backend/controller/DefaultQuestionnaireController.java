package hr_module.backend.controller;

import hr_module.backend.model.primary.DefaultQuestionnaire;
import hr_module.backend.model.primary.Job;
import hr_module.backend.model.primary.Question;
import hr_module.backend.service.DefaultQuestionnaireService;
import hr_module.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/default-questionnaire")
@CrossOrigin
public class DefaultQuestionnaireController {
    @Autowired
    private DefaultQuestionnaireService defaultQuestionnaireService;
    @Autowired
    private JobService jobService;

    @GetMapping ("/get")
    public List<Question> getQuestionsByJob (@RequestParam Integer jobId) {
        Job job = jobService.getById(jobId);
        return defaultQuestionnaireService.getQuestionsByJob(job);
    }

    @PostMapping ("/add")
    public String add (@RequestBody DefaultQuestionnaire defaultQuestionnaire) {
        defaultQuestionnaireService.saveDefaultQuestionnaire(defaultQuestionnaire);
        return "Questionnaire added!";
    }

    @DeleteMapping ("/delete")
    public void delete (@RequestParam Integer id) {
        Job job = jobService.getById(id);
        defaultQuestionnaireService.deleteByJob (job);
    }
}
