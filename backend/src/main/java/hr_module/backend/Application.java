package hr_module.backend;

import hr_module.backend.config.PersistenceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@EntityScan(basePackages = "hr_module.backend.model")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
