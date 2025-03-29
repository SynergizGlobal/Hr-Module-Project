package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Entity
@Table(name = "job_title")
public class JobTitle {
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
    @Column(name = "job_title_id")
    private int id;

    @Column(name = "job_title_name", length = 100, nullable = false, unique = true)
    private String name;

    public JobTitle() {
    }

    public JobTitle(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public JobTitle(String name) {
        this.name = name;
    }

}
