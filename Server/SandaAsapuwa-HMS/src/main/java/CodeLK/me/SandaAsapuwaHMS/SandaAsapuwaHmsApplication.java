package CodeLK.me.SandaAsapuwaHMS;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;


@SpringBootApplication

public class SandaAsapuwaHmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SandaAsapuwaHmsApplication.class, args);
	}

	@PostConstruct
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}
}
