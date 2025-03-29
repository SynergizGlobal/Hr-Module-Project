package hr_module.backend.controller;

import hr_module.backend.model.primary.CandidateStatus;
import hr_module.backend.service.CandidateStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/candidate-status")
@CrossOrigin
public class CandidateStatusController {
    @Autowired
    private CandidateStatusService candidateStatusService;

    @GetMapping ("/{id}")
    public CandidateStatus getCandidateStatusById (@PathVariable Integer id) {
        return candidateStatusService.getById (id);
    }

    @GetMapping ("/getAll")
    public List<CandidateStatus> getAllCandidateStatus() {
        return candidateStatusService.getAllCandidateStatus();
    }

    @PostMapping ("/save")
    public String add (@RequestBody CandidateStatus candidateStatus) {
        candidateStatusService.saveCandidateStatus(candidateStatus);
        return "New Candidate status added!";
    }
}
