package hr_module.backend.model.primary;

import hr_module.backend.model.secondary.EmployeeDetails;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table (name = "employee")
public class Employee {
  

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "employee_id")
    private int id;

    @Column(name = "synergiz_id_fk", length = 20)
    private String synergizId;

    @ManyToOne
    @JoinColumn (name = "user_type_id_fk", referencedColumnName = "user_type_id")
    private UserType userType;

    @Transient
    private EmployeeDetails employeeDetails;

    public Employee() {
    }

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSynergizId() {
		return synergizId;
	}

	public void setSynergizId(String synergizId) {
		this.synergizId = synergizId;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public EmployeeDetails getEmployeeDetails() {
		return employeeDetails;
	}

	public Employee(String synergizId, UserType userType) {
        this.synergizId = synergizId;
        this.userType = userType;
    }

    public void setEmployeeDetails(EmployeeDetails employeeDetails) {
        this.employeeDetails = employeeDetails;
        if (employeeDetails != null) {
            this.synergizId = employeeDetails.getId();
        }
    }
}
