package hr_module.backend.service;

import hr_module.backend.model.primary.JobTitle;

import java.util.List;

public interface JobTitleService {
    public JobTitle saveJobTitle (JobTitle jobTitle);

    public List<JobTitle> getAllJobTitles();

    public JobTitle updateJobTitle (JobTitle newJobTitle);
}
