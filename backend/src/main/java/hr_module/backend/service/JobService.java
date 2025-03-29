package hr_module.backend.service;

import hr_module.backend.model.primary.Job;

import java.util.List;

public interface JobService {
    public Job saveJob (Job job);

    public List<Job> getAllJobs();

    public Job getById (Integer id);
}
