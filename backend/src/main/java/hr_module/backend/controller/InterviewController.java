package hr_module.backend.controller;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Interview;
import hr_module.backend.service.CandidateService;
import hr_module.backend.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/interview")
@CrossOrigin
public class InterviewController {
    @Autowired
    private InterviewService interviewService;
    @Autowired
    private CandidateService candidateService;

    @GetMapping ("/{candidateId}")
    public List<Interview> getInterviewByCandidate (@PathVariable Integer candidateId) {
        Candidate candidate = candidateService.getById(candidateId);
        return interviewService.getInterviewsByCandidate(candidate);
    }

    @PostMapping ("/add")
    public Interview add (@RequestBody Interview interview) {
        return interviewService.saveInterview(interview);
    }

    @DeleteMapping ("/delete")
    public void deleteInterviewByCandidate (@RequestParam Integer candidateId) {
        Candidate candidate = candidateService.getById(candidateId);
        interviewService.deleteInterviewsByCandidate(candidate);
    }
}
