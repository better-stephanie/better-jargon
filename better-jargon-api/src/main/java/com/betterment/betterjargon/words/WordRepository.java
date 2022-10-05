package com.betterment.betterjargon.words;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WordRepository extends CrudRepository<Word, UUID> {

    Optional<Word> findByWordIgnoreCase(String word);
}
