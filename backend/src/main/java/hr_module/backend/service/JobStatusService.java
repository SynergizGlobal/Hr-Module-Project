package hr_module.backend.service;

import hr_module.backend.model.primary.JobStatus;

import java.util.List;

public interface JobStatusService {
    public JobStatus saveJobStatus (JobStatus jobStatus);

    public List<JobStatus> getAllJobStatus();
}
