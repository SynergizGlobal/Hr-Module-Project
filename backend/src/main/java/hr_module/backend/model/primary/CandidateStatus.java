package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table (name = "candidate_status")
public class CandidateStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "candidate_status_id")
    private int id;

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

	@Column (name = "candidate_status_name", length = 20, nullable = false)
    private String name;

    public CandidateStatus() {
    }

    public CandidateStatus(String name) {
        this.name = name;
    }

}
