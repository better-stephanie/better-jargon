package com.betterment.betterjargon.words;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WordRepository extends CrudRepository<Word, UUID> {

    List<Word> findAllByWordIgnoreCase(String word);
}
