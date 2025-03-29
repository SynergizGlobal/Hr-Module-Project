package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table (name = "modes_of_education")
public class ModeOfEducation {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "mode_of_education_id")
    private int id;

    @Column (name = "mode_of_education_name", length = 100)
    private String name;

    public ModeOfEducation() {
    }

    public ModeOfEducation(String name) {
        this.name = name;
    }
}
