package hr_module.backend.controller;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.CandidateQuestionnaire;
import hr_module.backend.model.primary.Question;
import hr_module.backend.service.CandidateQuestionnaireService;
import hr_module.backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("candidate-questionnaire")
@CrossOrigin
public class CandidateQuestionnaireController {
    @Autowired
    private CandidateQuestionnaireService candidateQuestionnaireService;
    @Autowired
    private CandidateService candidateService;

    @GetMapping ("/get")
    public List<Question> getQuestionsByCandidate (@RequestParam Integer candidateId) {
        Candidate candidate = candidateService.getById (candidateId);
        return candidateQuestionnaireService.getQuestionsByCandidate(candidate);
    }

    @PostMapping ("/add")
    public String add (@RequestBody CandidateQuestionnaire candidateQuestionnaire) {
        candidateQuestionnaireService.saveCandidateQuestionnaire(candidateQuestionnaire);
        return "Candidate Questionnaire added!";
    }

    @DeleteMapping ("/delete")
    public void delete (@RequestParam Integer id) {
        Candidate candidate = candidateService.getById(id);
        candidateQuestionnaireService.deleteByCandidate (candidate);
    }

}
