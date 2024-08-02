package com.example.missing.controller;

import com.example.missing.dto.AnuncioDTO;
import com.example.missing.model.Anuncio;
import com.example.missing.model.Usuario;
import com.example.missing.repository.UsuarioRepository;
import com.example.missing.service.JwtTokenProviderService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import com.example.missing.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtTokenProviderService jwtTokenProviderService;

    @PostMapping("/usuario/registro")
    public ResponseEntity<?> crearUsuario(@RequestParam String email, @RequestParam String nombre, @RequestParam String apellidos, @RequestParam Long telefono, @RequestParam String pword) {
        try {
            if (usuarioService.findByEmail(email) != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "User already exists");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            } else {
                String pwordHash = BCrypt.hashpw(pword, BCrypt.gensalt());
                Usuario usuario = new Usuario(email, nombre, apellidos, telefono, pwordHash);
                usuarioRepository.save(usuario);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/usuario/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String pword) {
        Usuario usuario = usuarioService.findByEmail(email);
        Map<String, Object> response = new HashMap<>();
        if (usuario == null) {
            response.put("status", "error");
            response.put("message", "User not found");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        } else if (BCrypt.checkpw(pword, usuario.getPword())) {
            response.put("status", "success");
            response.put("username", usuario.getEmail());
            String jwt = jwtTokenProviderService.createToken(usuario.getEmail());
            response.put("token", jwt);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.put("status", "error");
            response.put("message", "Invalid password");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/usuario/anuncios")
    public ResponseEntity<?> getAnunciosUsuario(@RequestParam String email) {
        Usuario usuario = usuarioService.findByEmail(email);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("User not found");
        } else {
            List<Anuncio> anuncios = usuario.getAnuncios();
            List<AnuncioDTO> anunciosDTO = new ArrayList<>();
            for(Anuncio anuncio: anuncios){
                AnuncioDTO anuncioDTO = new AnuncioDTO(anuncio.getId(), anuncio.getTitulo(), anuncio.getDescripcion(), String.format("/images/%d", anuncio.getId()), anuncio.getFecha(), anuncio.getRaza(), anuncio.getColor(), anuncio.getTamano(), anuncio.getLatitud(), anuncio.getLongitud(), anuncio.getUsuario().getNombre(), anuncio.getUsuario().getApellidos(), anuncio.getUsuario().getTelefono());
                anunciosDTO.add(anuncioDTO);
            }
            return ResponseEntity.ok(anunciosDTO);
        }
    }
}
