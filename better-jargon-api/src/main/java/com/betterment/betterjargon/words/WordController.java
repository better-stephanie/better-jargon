package com.betterment.betterjargon.words;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/words")
public class WordController {

    private WordRepository wordRepository;

    @Autowired
    public WordController(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @GetMapping("/{word}")
    public ResponseEntity<Word> defineWord(@PathVariable String word) {
        return ResponseEntity.of(wordRepository.findByWordIgnoreCase(word));
    }
}
