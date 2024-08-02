package com.example.missing.repository;

import com.example.missing.model.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String> {
    //Usuario findByNomUsuario(String nomUsuario);
    Usuario findByEmail(String email);
}
