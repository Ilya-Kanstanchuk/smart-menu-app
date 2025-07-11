package com.ilyaproject.smart_menu_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableScheduling
public class SmartMenuServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartMenuServerApplication.class, args);
	}

}
