package com.example.missing.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.List;

@Service
public class JwtTokenProviderService {
    private final Key clave;

    public JwtTokenProviderService() {
        this.clave = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String createToken(String nombreUsuario) {
        return Jwts.builder()
                .setSubject(nombreUsuario)
                .signWith(clave)
                .compact();
    }

    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(clave)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

}
