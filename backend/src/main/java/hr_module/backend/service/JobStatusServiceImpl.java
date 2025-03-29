package hr_module.backend.service;

import hr_module.backend.model.primary.JobStatus;
import hr_module.backend.repository.primary.JobStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobStatusServiceImpl implements JobStatusService {
    @Autowired
    private JobStatusRepository jobStatusRepository;

    @Override
    public JobStatus saveJobStatus(JobStatus jobStatus) {
        return jobStatusRepository.save(jobStatus);
    }

    @Override
    public List<JobStatus> getAllJobStatus() {
        return jobStatusRepository.findAll();
    }
}
