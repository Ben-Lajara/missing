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
    public ResponseEntity<?> crearUsuario(@RequestParam String nomUsuario, @RequestParam String nombre, @RequestParam String apellidos, @RequestParam Long telefono, @RequestParam String email, @RequestParam String pword) {
        try {
            if (usuarioService.findByNomUsuario(nomUsuario) != null) {
                return ResponseEntity.badRequest().body("Username already exists");
            } else if (usuarioService.findByEmail(email) != null) {
                return ResponseEntity.badRequest().body("Email already exists");
            } else {
                String pwordHash = BCrypt.hashpw(pword, BCrypt.gensalt());
                Usuario usuario = new Usuario(nomUsuario, nombre, apellidos, telefono, email, pwordHash);
                usuarioRepository.save(usuario);
                return new ResponseEntity<>(HttpStatus.CREATED);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/usuario/login")
    public ResponseEntity<?> login(@RequestParam String nomUsuario, @RequestParam String pword) {
        Usuario usuario = usuarioService.findByNomUsuario(nomUsuario);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("User not found");
        } else if (BCrypt.checkpw(pword, usuario.getPword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("username", usuario.getNomUsuario());
            String jwt = jwtTokenProviderService.createToken(usuario.getNomUsuario());
            response.put("token", jwt);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body("Invalid password");
        }
    }

    @GetMapping("/usuario/anuncios")
    public ResponseEntity<?> getAnunciosUsuario(@RequestParam String nomUsuario) {
        Usuario usuario = usuarioService.findByNomUsuario(nomUsuario);
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
