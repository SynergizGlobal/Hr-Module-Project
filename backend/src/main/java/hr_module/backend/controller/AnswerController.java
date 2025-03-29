package hr_module.backend.controller;

import hr_module.backend.model.primary.Answer;
import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Question;
import hr_module.backend.service.AnswerService;
import hr_module.backend.service.CandidateService;
import hr_module.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/answer")
@CrossOrigin
public class AnswerController {
    @Autowired
    private AnswerService answerService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private CandidateService candidateService;

    @GetMapping ("/get")
    public List<Answer> getAnswersByCandidate (@RequestParam Integer candidateId) {
        Candidate candidate = candidateService.getById(candidateId);
        return answerService.getAnswersByCandidate(candidate);
    }

    @PostMapping ("/add")
    public String add (@RequestBody Answer answer) {
        answerService.saveAnswer(answer);
        return "New Answer Added!";
    }

    @DeleteMapping ("/delete")
    public void delete (@RequestParam Integer questionId, Integer candidateId) {
        Question question = questionService.getById(questionId);
        Candidate candidate = candidateService.getById(candidateId);
        answerService.deleteAnswerByQuestionAndCandidate(question, candidate);
    }
}
