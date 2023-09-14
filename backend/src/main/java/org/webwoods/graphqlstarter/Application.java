package org.webwoods.graphqlstarter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * The Application class is the entry point for a Spring Boot application with JPA repositories
 * enabled.
 */
@SpringBootApplication
@EnableJpaRepositories()
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
