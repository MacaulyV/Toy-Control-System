package com.brinquedos.gestaobrinquedos.repository;

import com.brinquedos.gestaobrinquedos.model.Brinquedo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrinquedoRepository extends JpaRepository<Brinquedo, Long> {

    // Busca brinquedos cujo nome contenha o valor passado, sem diferenciar maiúsculas de minúsculas
    List<Brinquedo> findByNomeContainingIgnoreCase(String nome);
}
