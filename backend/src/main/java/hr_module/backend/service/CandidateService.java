package hr_module.backend.service;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.CandidateStatus;
import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.primary.Job;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface CandidateService {
    public Candidate saveCandidate (Candidate candidate);

    public List<Candidate> getAllCandidates();

    public List<Candidate> getCandidatesByStatus(CandidateStatus candidateStatus);

    public List<Candidate> getCandidatesByEmployee (Employee employee);

    public Candidate getById (Integer id);

    public List<Candidate> getCandidatesByEmployeeAndStatus (Employee employee, CandidateStatus status);

    public List<Object> countCandidateStatusByJob (Job job);

//    public void processExcelData (MultipartFile file) throws IOException;
//
//    public void processExcelData (MultipartFile file, Job job) throws IOException;
}
