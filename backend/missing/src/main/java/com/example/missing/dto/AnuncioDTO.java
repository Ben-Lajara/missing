package com.example.missing.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;

import java.util.Date;

public class AnuncioDTO {
    private Long id;
    private String titulo;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String descripcion;
    private String imagen;
    private Date fecha;
    private String raza;
    private String color;
    private String tamano;
    private Boolean collar;
    private Boolean vacunado;
    private Double latitud;
    private Double longitud;
    private String email;
    private String nombre;
    private String apellidos;
    private Long telefono;

    public AnuncioDTO() {
    }

    public AnuncioDTO(Long id, String titulo, String descripcion, String imagen, Date fecha, String raza, String color, String tamano, Double latitud, Double longitud, String nombre, String apellidos, Long telefono) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fecha = fecha;
        this.raza = raza;
        this.color = color;
        this.tamano = tamano;
        this.latitud = latitud;
        this.longitud = longitud;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
    }

    public AnuncioDTO(Long id, String titulo, String descripcion, String imagen, Date fecha, String raza, String color, String tamano, Boolean collar, Boolean vacunado, Double latitud, Double longitud, String email, String nombre, String apellidos, Long telefono) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.fecha = fecha;
        this.raza = raza;
        this.color = color;
        this.tamano = tamano;
        this.collar = collar;
        this.vacunado = vacunado;
        this.latitud = latitud;
        this.longitud = longitud;
        this.email = email;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getRaza() {
        return raza;
    }

    public void setRaza(String raza) {
        this.raza = raza;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getTamano() {
        return tamano;
    }

    public void setTamano(String tamano) {
        this.tamano = tamano;
    }

    public Boolean getCollar() {
        return collar;
    }

    public void setCollar(Boolean collar) {
        this.collar = collar;
    }

    public Boolean getVacunado() {
        return vacunado;
    }

    public void setVacunado(Boolean vacunado) {
        this.vacunado = vacunado;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public Long getTelefono() {
        return telefono;
    }

    public void setTelefono(Long telefono) {
        this.telefono = telefono;
    }
}
