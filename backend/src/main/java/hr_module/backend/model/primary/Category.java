package hr_module.backend.model.primary;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "category", uniqueConstraints = @UniqueConstraint(columnNames = "category_name"))

public class Category {
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
    @Column (name = "category_id")
    private int id;

    @Column(name = "category_name", length = 100, nullable = false, unique = true)
    private String name;

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

}
