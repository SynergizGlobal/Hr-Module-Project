package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table (name = "user_type")
public class UserType {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "user_type_id")
    private int id;

    @Column (name = "user_type_name", length = 30)
    private String name;

    public UserType() {
    }

    public UserType(String name) {
        this.name = name;
    }

}
