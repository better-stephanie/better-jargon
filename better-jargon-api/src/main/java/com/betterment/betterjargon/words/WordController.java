package com.betterment.betterjargon.words;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/api/v1/words")
public class WordController {

    private static final Logger LOG = LoggerFactory.getLogger(WordController.class);

    private WordRepository wordRepository;

    @Autowired
    public WordController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @GetMapping("/{word}")
    public ResponseEntity<Word> defineWord(@PathVariable String word) {
        LOG.info("Looking for '{}'", word);
        Optional<Word> result = wordRepository.findByWordIgnoreCase(word);
        if (result.isPresent()) {
            LOG.info("Found '{}'", word);
        } else {
            LOG.info("Did not find '{}'", word);
        }

        return ResponseEntity.of(wordRepository.findByWordIgnoreCase(word));
    }
}
