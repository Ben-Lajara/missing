package com.example.missing.controller;

import com.example.missing.dto.AnuncioDTO;
import com.example.missing.model.Anuncio;
import com.example.missing.model.Usuario;
import com.example.missing.repository.AnuncioRepository;
import com.example.missing.service.AnuncioService;
import com.example.missing.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
public class AnuncioController {
    @Autowired
    private AnuncioService anuncioService;

    @Autowired
    private AnuncioRepository anuncioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/anuncios")
    public ResponseEntity<?> getAnuncios(@RequestParam Double latitude, @RequestParam Double longitude, @RequestParam Double radius) {
        List<Anuncio> anuncios = anuncioService.findWithinRadius(latitude, longitude, radius);
        List<AnuncioDTO> anunciosDTO = new ArrayList<>();
        for (Anuncio anuncio: anuncios) {
            AnuncioDTO anuncioDTO = new AnuncioDTO(anuncio.getId(), anuncio.getTitulo(), anuncio.getDescripcion(), String.format("/images/%d", anuncio.getId()), anuncio.getFecha(), anuncio.getRaza(), anuncio.getColor(), anuncio.getTamano(), anuncio.getLatitud(), anuncio.getLongitud(), anuncio.getUsuario().getNombre(), anuncio.getUsuario().getApellidos(), anuncio.getUsuario().getTelefono());
            anunciosDTO.add(anuncioDTO);
        }
        return ResponseEntity.ok(anunciosDTO);
    }

    @PostMapping("/anuncio")
    public ResponseEntity<?> postAnuncio(@RequestParam String titulo, @RequestParam String descripcion, @RequestParam MultipartFile imagen, @RequestParam String fecha, @RequestParam String raza, @RequestParam String color, @RequestParam String tamano, @RequestParam Boolean collar, @RequestParam Boolean vacunado, @RequestParam Double latitude, @RequestParam Double longitude, @RequestParam String nomUsuario) throws ParseException, IOException {
        Usuario usuario = usuarioService.findByNomUsuario(nomUsuario);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date fechaFormateada = formatter.parse((String) fecha);
        byte[] imagenBytes = imagen.getBytes();
        Anuncio anuncio = new Anuncio(titulo, descripcion, imagenBytes, fechaFormateada, raza, color, tamano, collar, vacunado, latitude, longitude, usuario);
        anuncioRepository.save(anuncio);
        return new ResponseEntity<>(Collections.singletonMap("status", "success"), HttpStatus.OK);
    }

    @GetMapping("/anuncio/{id}")
    public ResponseEntity<?> getAnuncioById(@PathVariable Long id) {
        Anuncio anuncio = anuncioRepository.findById(id);
        Usuario usuario = usuarioService.findByNomUsuario(anuncio.getUsuario().getNomUsuario());
        String imagenUrl = String.format("/images/%d", anuncio.getId());
        AnuncioDTO anuncioDTO = new AnuncioDTO(anuncio.getId(), anuncio.getTitulo(), anuncio.getDescripcion(), imagenUrl, anuncio.getFecha(), anuncio.getRaza(), anuncio.getColor(), anuncio.getTamano(), anuncio.getCollar(), anuncio.getVacunado(), anuncio.getLatitud(), anuncio.getLongitud(), usuario.getNombre(), usuario.getApellidos(), usuario.getTelefono());
        return ResponseEntity.ok(anuncioDTO);
    }

    @DeleteMapping("/anuncio")
    public ResponseEntity<?> deleteAnuncio(@RequestParam Long id) {
        Anuncio anuncio = anuncioRepository.findById(id);
        anuncioRepository.delete(anuncio);
        return new ResponseEntity<>(Collections.singletonMap("status", "success"), HttpStatus.OK);
    }
}