package hr_module.backend.controller;

import hr_module.backend.model.primary.Question;
import hr_module.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("/get")
    public List<Question> getQuestionsByJobTitleId (@RequestParam Integer jobTitleId) {
        return questionService.getQuestionsByJobTitleId(jobTitleId);
    }

    @DeleteMapping("/delete")
    public String delete (@RequestParam Integer id) {
        questionService.deleteQuestionById(id);
        return "Question deleted.";
    }

    @PostMapping ("/add")
    public String add(@RequestBody Question question) {
        questionService.saveQuestion(question);
        return "New Question added!";
    }
}
