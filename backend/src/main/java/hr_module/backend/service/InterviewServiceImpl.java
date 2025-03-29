package hr_module.backend.service;

import hr_module.backend.model.primary.Candidate;
import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.primary.Interview;
import hr_module.backend.model.secondary.EmployeeDetails;
import hr_module.backend.repository.primary.InterviewRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InterviewServiceImpl implements InterviewService {
    @Autowired
    private InterviewRepository interviewRepository;

    @PersistenceContext(unitName = "secondaryEntityManagerFactory")
    private EntityManager secondaryEm;

    @Override
    @Transactional(value = "primaryTransactionManager", readOnly = true)
    public List<Interview> getInterviewsByCandidate(Candidate candidate) {
        List<Interview> interviewList = interviewRepository.findByCandidate(candidate);
        for (Interview interview : interviewList) {
            Employee firstInterviewer = interview.getFirstInterviewer();
            Employee secondInterviewer = interview.getSecondInterviewer();
            Employee thirdInterviewer = interview.getThirdInterviewer();

            if (firstInterviewer != null && firstInterviewer.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, firstInterviewer.getSynergizId());
                firstInterviewer.setEmployeeDetails(details);
            }

            if (secondInterviewer != null && secondInterviewer.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, secondInterviewer.getSynergizId());
                secondInterviewer.setEmployeeDetails(details);
            }

            if (thirdInterviewer != null && thirdInterviewer.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, thirdInterviewer.getSynergizId());
                thirdInterviewer.setEmployeeDetails(details);
            }
        }

        return interviewList;
    }

    @Override
    @Transactional(value = "primaryTransactionManager")
    public Interview saveInterview(Interview interview) {
        Interview response = interviewRepository.save(interview);

        Employee firstInterviewer = response.getFirstInterviewer();
        Employee secondInterviewer = response.getSecondInterviewer();
        Employee thirdInterviewer = response.getThirdInterviewer();

        if (firstInterviewer != null && firstInterviewer.getSynergizId() != null) {
            EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, firstInterviewer.getSynergizId());
            firstInterviewer.setEmployeeDetails(details);
        }

        if (secondInterviewer != null && secondInterviewer.getSynergizId() != null) {
            EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, secondInterviewer.getSynergizId());
            secondInterviewer.setEmployeeDetails(details);
        }

        if (thirdInterviewer != null && thirdInterviewer.getSynergizId() != null) {
            EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, thirdInterviewer.getSynergizId());
            thirdInterviewer.setEmployeeDetails(details);
        }

        return response;
    }

    @Override
    public void deleteInterviewsByCandidate(Candidate candidate) {
        interviewRepository.deleteByCandidate(candidate);
    }
}
