package hr_module.backend.controller;

import hr_module.backend.model.primary.JobTitle;
import hr_module.backend.service.JobTitleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job-title")
@CrossOrigin
public class JobTitleController {
    @Autowired
    private JobTitleService jobTitleService;

    @GetMapping("/getAll")
    public List<JobTitle> getAllJobTitles() {
        return jobTitleService.getAllJobTitles();
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody JobTitle jobTitle) {
        try {
            jobTitleService.saveJobTitle(jobTitle);
            return ResponseEntity.ok("New job title added!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/update")
    public JobTitle update (@RequestBody JobTitle newJobTitle) {
        return jobTitleService.updateJobTitle (newJobTitle);
    }
}
