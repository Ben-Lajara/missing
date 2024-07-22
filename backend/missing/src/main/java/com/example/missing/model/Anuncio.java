package com.example.missing.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Anuncio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String descripcion;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] imagen;
    //private String imagen;
    private Date fecha;
    private String raza;
    private String color;
    private String tamano;
    private Boolean collar;
    private Boolean vacunado;
    private Double latitud;
    private Double longitud;
    @ManyToOne
    @JoinColumn(name = "nomUsuario", nullable = false)
    private Usuario usuario;

    public Anuncio() {
    }

    public Anuncio(String titulo, String descripcion, byte[] imagen, Date fecha, String raza, String color, String tamano, Boolean collar, Boolean vacunado, Double latitud, Double longitud, Usuario usuario) {
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
        this.usuario = usuario;
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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
