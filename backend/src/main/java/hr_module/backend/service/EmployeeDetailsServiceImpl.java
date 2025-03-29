package hr_module.backend.service;

import hr_module.backend.model.secondary.EmployeeDetails;
import hr_module.backend.repository.secondary.EmployeeDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EmployeeDetailsServiceImpl implements EmployeeDetailsService {
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;

    @Override
    public List<EmployeeDetails> getAllEmployees() {
        return employeeDetailsRepository.findAll();
    }

    @Override
    public EmployeeDetails getByEmail(String email) {
        return employeeDetailsRepository.findByEmail(email);
    }

    @Override
    public EmployeeDetails getById(String synergizId) {
        return employeeDetailsRepository.findById(synergizId)
                .orElseThrow(() -> new NoSuchElementException("Details not found."));
    }
}
