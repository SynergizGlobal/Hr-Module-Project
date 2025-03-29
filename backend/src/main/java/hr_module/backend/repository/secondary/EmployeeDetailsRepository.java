package hr_module.backend.repository.secondary;

import hr_module.backend.model.secondary.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails, String> {
    EmployeeDetails findByEmail (String email);
}
