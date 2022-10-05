package com.betterment.betterjargon;

import com.betterment.betterjargon.words.Word;
import com.betterment.betterjargon.words.WordRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@SpringBootApplication
public class BetterJargonApplication {

	private static final Logger LOG = LoggerFactory.getLogger(BetterJargonApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BetterJargonApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(WordRepository wordRepository) {
		return args -> {
			// read json and write to db
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<Word>> typeReference = new TypeReference<>() {
			};
			InputStream inputStream = TypeReference.class.getResourceAsStream("/definitions/words.json");
			try {
				List<Word> words = mapper.readValue(inputStream, typeReference);
				wordRepository.saveAll(words);
				LOG.info("Persisted " + words.size() + " words!");
			} catch (IOException e) {
				LOG.error("Unable to save words: " + e.getMessage());
			}
		};
	}
}
