package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "job_status")
public class JobStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "job_status_id")
    private int id;

    @Column (name = "job_status_name", length = 20, nullable = false)
    private String name;

    public JobStatus() {
    }

    public JobStatus(String name) {
        this.name = name;
    }
}
