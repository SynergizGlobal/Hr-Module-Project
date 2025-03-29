package hr_module.backend.service;

import hr_module.backend.model.primary.CandidateStatus;
import hr_module.backend.repository.primary.CandidateStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CandidateStatusServiceImpl implements  CandidateStatusService{
    @Autowired
    private CandidateStatusRepository candidateStatusRepository;

    @Override
    public CandidateStatus saveCandidateStatus(CandidateStatus candidateStatus) {
        return candidateStatusRepository.save(candidateStatus);
    }

    @Override
    public CandidateStatus getById(Integer id) {
        return candidateStatusRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Candidate Status not found"));
    }

    @Override
    public List<CandidateStatus> getAllCandidateStatus() {
        return candidateStatusRepository.findAll();
    }
}
