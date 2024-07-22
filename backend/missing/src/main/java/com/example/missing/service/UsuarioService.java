package com.example.missing.service;

import com.example.missing.model.Usuario;
import com.example.missing.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario findByNomUsuario(String nomUsuario) {
        return usuarioRepository.findByNomUsuario(nomUsuario);
    }

    public Usuario findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}
