package com.example.missing.service;

import com.example.missing.model.Anuncio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.missing.repository.AnuncioRepository;

import java.util.List;

@Service
public class AnuncioService {
    @Autowired
    private AnuncioRepository anuncioRepository;

    public List<Anuncio> findWithinRadius(Double latitude, Double longitude, Double radius) {
        return anuncioRepository.findWithinRadius(latitude, longitude, radius);
    }

    public int count(){
        return (int) anuncioRepository.count();
    }

    public void save(Anuncio anuncio){
        anuncioRepository.save(anuncio);
    }
}
