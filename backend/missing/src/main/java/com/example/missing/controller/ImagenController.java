package com.example.missing.controller;

import com.example.missing.model.Anuncio;
import com.example.missing.repository.AnuncioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/images")
public class ImagenController {
    @Autowired
    private AnuncioRepository anuncioRepository;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Optional<Anuncio> anuncioOptional = Optional.ofNullable(anuncioRepository.findById(id));
        if (anuncioOptional.isPresent()) {
            Anuncio anuncio = anuncioOptional.get();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentLength(anuncio.getImagen().length);
            return new ResponseEntity<>(anuncio.getImagen(), headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
