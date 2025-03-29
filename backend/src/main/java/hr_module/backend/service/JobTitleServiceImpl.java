package hr_module.backend.service;

import hr_module.backend.model.primary.JobTitle;
import hr_module.backend.repository.primary.JobTitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobTitleServiceImpl implements JobTitleService {

    @Autowired
    private JobTitleRepository jobTitleRepository;
    
    @Override
    public JobTitle saveJobTitle(JobTitle jobTitle) {
        Optional<JobTitle> existingJobTitle = jobTitleRepository.findByName(jobTitle.getName());
        if (existingJobTitle.isPresent()) {
            throw new RuntimeException("Job title '" + jobTitle.getName() + "' already exists.");
        }
        return jobTitleRepository.save(jobTitle);
    }

    @Override
    public List<JobTitle> getAllJobTitles() {
        return jobTitleRepository.findAll();
    }

    @Override
    public JobTitle updateJobTitle(JobTitle newJobTitle) {
        return jobTitleRepository.save(newJobTitle);
    }
}
