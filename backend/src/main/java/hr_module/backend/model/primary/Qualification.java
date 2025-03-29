package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table (name = "educational_qualification")
public class Qualification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "qualification_id")
    private int id;

    @Column (name = "qualification_name", length = 100, nullable = false, unique = true)
    private String name;

    public Qualification() {
    }

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

	public Qualification(String name) {
        this.name = name;
    }

}
