package hr_module.backend.service;

import hr_module.backend.model.primary.Employee;

import java.util.List;

public interface EmployeeService {
    public Employee getEmployeeById (Integer employeeId);

    public Employee getEmployeeBySynergizId (String synergizId);

    public Employee getEmployeeByEmail (String email);

    public Employee getEmployeeWithDetails(int employeeId);

    public List<Employee> getAllEmployeesWithDetails();
}
