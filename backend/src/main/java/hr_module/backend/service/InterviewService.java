package hr_module.backend.service;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Interview;

import java.util.List;

public interface InterviewService {
    public List<Interview> getInterviewsByCandidate (Candidate candidate);

    public Interview saveInterview (Interview interview);

    public void deleteInterviewsByCandidate (Candidate candidate);
}
