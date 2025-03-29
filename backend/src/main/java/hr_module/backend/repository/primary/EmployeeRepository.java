package hr_module.backend.repository.primary;

import hr_module.backend.model.primary.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Employee findBySynergizId(String synergizId);
}
