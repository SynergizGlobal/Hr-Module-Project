package hr_module.backend.service;

import hr_module.backend.model.primary.CandidateStatus;

import java.util.List;

public interface CandidateStatusService {
    public CandidateStatus saveCandidateStatus (CandidateStatus candidateStatus);

    public List<CandidateStatus> getAllCandidateStatus();

    public CandidateStatus getById (Integer id);
}
