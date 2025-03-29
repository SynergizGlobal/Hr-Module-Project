package hr_module.backend.model.primary;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "project", uniqueConstraints = @UniqueConstraint(columnNames = "project_name")) // Enforce unique project name
public class Project {
	
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "project_id")
    private int id;

    @Column(name = "project_name", length = 50, nullable = false, unique = true)
    private String name;

    public Project() {
    }

    public Project(String name) {
        this.name = name;
    }

}
