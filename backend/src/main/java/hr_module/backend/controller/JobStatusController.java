package hr_module.backend.controller;

import hr_module.backend.model.primary.JobStatus;
import hr_module.backend.service.JobStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job-status")
@CrossOrigin
public class JobStatusController {
    @Autowired
    private JobStatusService jobStatusService;

    @GetMapping("/getAll")
    public List<JobStatus> getAllJobStatus() {
        return jobStatusService.getAllJobStatus();
    }

    @PostMapping("/add")
    public String add (@RequestBody JobStatus jobStatus) {
        jobStatusService.saveJobStatus(jobStatus);
        return "New Job Status added!";
    }
}
