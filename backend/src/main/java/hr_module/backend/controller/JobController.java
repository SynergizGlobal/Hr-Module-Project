package hr_module.backend.controller;

import hr_module.backend.model.primary.Job;
import hr_module.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/job")
@CrossOrigin
public class JobController {
    @Autowired
    private JobService jobService;

    @GetMapping("/getAll")
    public List<Job> getAllJobs () {

        return jobService.getAllJobs();
    }

    @PostMapping("/add")
    public Job add (@RequestBody Job job) {
        return jobService.saveJob(job);
    }
}
