package hr_module.backend.service;

import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.secondary.EmployeeDetails;
import hr_module.backend.repository.primary.EmployeeRepository;
import hr_module.backend.repository.secondary.EmployeeDetailsRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;

    @PersistenceContext(unitName = "primaryEntityManagerFactory")
    private EntityManager primaryEm;

    @PersistenceContext(unitName = "secondaryEntityManagerFactory")
    private EntityManager secondaryEm;

    @Override
    public Employee getEmployeeById(Integer employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new NoSuchElementException("Employee Not Found"));
    }

    @Override
    @Transactional(value = "primaryTransactionManager", readOnly = true)
    public Employee getEmployeeWithDetails(int employeeId) {
        Employee employee = primaryEm.find(Employee.class, employeeId);
        if (employee != null && employee.getSynergizId() != null) {
            EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee.getSynergizId());
            employee.setEmployeeDetails(details);
        }
        return employee;
    }

    @Override
    @Transactional(value = "primaryTransactionManager", readOnly = true)
    public List<Employee> getAllEmployeesWithDetails() {
        List<Employee> employees = primaryEm.createQuery("SELECT e FROM Employee e", Employee.class).getResultList();

        for (Employee employee : employees) {
            if (employee.getSynergizId() != null) {
                EmployeeDetails details = secondaryEm.find(EmployeeDetails.class, employee.getSynergizId());
                employee.setEmployeeDetails(details);
            }
        }

        return employees;
    }

    @Override
    public Employee getEmployeeByEmail(String email) {
        EmployeeDetails employeeDetails = employeeDetailsRepository.findByEmail(email);

        Employee employee = employeeRepository.findBySynergizId(employeeDetails.getId());

        employee.setEmployeeDetails(employeeDetails);

        return employee;
    }

    @Override
    public Employee getEmployeeBySynergizId(String synergizId) {
        EmployeeDetails employeeDetails = employeeDetailsRepository.findById(synergizId)
                .orElseThrow(() -> new NoSuchElementException("Details not found"));

        Employee employee = employeeRepository.findBySynergizId(employeeDetails.getId());
        employee.setEmployeeDetails(employeeDetails);

        return employee;
    }
}
