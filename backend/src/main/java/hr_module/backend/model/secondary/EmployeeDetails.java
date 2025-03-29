package hr_module.backend.model.secondary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table (name = "employee")
public class EmployeeDetails {
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Id
    @Column (name = "id", length = 20)
    private String id;

    @Column (name = "Name", length = 100)
    private String name;

    @Column (name = "email", length = 100)
    private String email;

    public EmployeeDetails() {
    }

    public EmployeeDetails(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

	
}
