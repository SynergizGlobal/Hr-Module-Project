package hr_module.backend.controller;

import hr_module.backend.model.primary.Employee;
import hr_module.backend.model.primary.UserType;
import hr_module.backend.model.secondary.EmployeeDetails;
import hr_module.backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/employee")
@CrossOrigin
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping ("/email/{email}")
    public Employee getEmployeeByEmail (@PathVariable String email) {
        return employeeService.getEmployeeByEmail(email);
    }

    @GetMapping ("/getAll")
    public List<Employee> getAllEmployees () {
        return employeeService.getAllEmployeesWithDetails();
    }
}
