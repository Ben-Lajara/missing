package com.example.missing.repository;

import com.example.missing.model.Anuncio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnuncioRepository extends CrudRepository<Anuncio, String>{
    @Query(value = "SELECT a FROM Anuncio a WHERE (6371 * acos(cos(radians(:latitude)) * cos(radians(a.latitud)) * cos(radians(a.longitud) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(a.latitud)))) < :radius")
    List<Anuncio> findWithinRadius(@Param("latitude") Double latitude, @Param("longitude") Double longitude, @Param("radius") Double radius);

    Anuncio findById(Long id);

}
