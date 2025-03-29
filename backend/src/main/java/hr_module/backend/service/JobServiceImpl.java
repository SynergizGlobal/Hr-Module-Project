package hr_module.backend.service;

import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.primary.Job;
import hr_module.backend.model.secondary.EmployeeDetails;
import hr_module.backend.repository.primary.JobRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;

    @PersistenceContext(unitName = "secondaryEntityManagerFactory")
    private EntityManager secondaryEm;

    @Override
    @Transactional(value = "primaryTransactionManager", readOnly = true)
    public List<Job> getAllJobs() {

        List<Job> jobs = jobRepository.findAll();

        for (Job job : jobs) {
            Employee employee = job.getInterviewer();
            if (employee != null && employee.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee.getSynergizId());
                employee.setEmployeeDetails(details);
            }
        }

        return jobs;
    }

    @Override
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    @Transactional(value = "primaryTransactionManager", readOnly = true)
    public Job getById(Integer id) {
        Job job = jobRepository.findById(id)
                  .orElseThrow(()-> new NoSuchElementException("Job Not Found"));

        Employee employee = job.getInterviewer();
        if (employee != null && employee.getSynergizId() != null) {
            EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee.getSynergizId());
            employee.setEmployeeDetails(details);
        }

        return job;
    }
}
