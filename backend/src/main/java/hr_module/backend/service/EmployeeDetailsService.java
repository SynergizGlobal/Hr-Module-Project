package hr_module.backend.service;

import hr_module.backend.model.secondary.EmployeeDetails;

import java.util.List;

public interface EmployeeDetailsService {
    public List<EmployeeDetails> getAllEmployees ();

    public EmployeeDetails getById (String synergizId);

    public EmployeeDetails getByEmail (String email);
}
