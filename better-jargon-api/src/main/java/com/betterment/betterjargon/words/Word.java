package com.betterment.betterjargon.words;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.util.UUID;

@Entity
public class Word {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private UUID id;
    private String word;

    @JsonProperty("short_definition")
    private String shortDefinition;

    @Lob
    @JsonProperty("long_definition")
    private String longDefinition;
    private String url;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getShortDefinition() {
        return shortDefinition;
    }

    public void setShortDefinition(String definition) {
        this.shortDefinition = definition;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLongDefinition() {
        return longDefinition;
    }

    public void setLongDefinition(String longDefinition) {
        this.longDefinition = longDefinition;
    }
}
