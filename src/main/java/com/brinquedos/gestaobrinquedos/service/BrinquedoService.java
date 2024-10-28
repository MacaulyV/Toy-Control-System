package com.brinquedos.gestaobrinquedos.service;

import com.brinquedos.gestaobrinquedos.model.Brinquedo;
import com.brinquedos.gestaobrinquedos.repository.BrinquedoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrinquedoService {

    @Autowired
    private BrinquedoRepository brinquedoRepository;

    // Retorna todos os brinquedos disponíveis no banco de dados
    public List<Brinquedo> getAllBrinquedos() {
        return brinquedoRepository.findAll();
    }

    // Retorna brinquedos cujo nome corresponde (parcialmente ou completamente) ao valor fornecido
    public List<Brinquedo> getBrinquedosByNome(String nome) {
        return brinquedoRepository.findByNomeContainingIgnoreCase(nome);
    }

    // Busca um brinquedo específico pelo ID, retornando um Optional que indica a possibilidade de não encontrar o brinquedo
    public Optional<Brinquedo> getBrinquedoById(Long id) {
        return brinquedoRepository.findById(id);
    }

    // Salva um novo brinquedo ou atualiza um existente no banco de dados
    public Brinquedo saveBrinquedo(Brinquedo brinquedo) {
        return brinquedoRepository.save(brinquedo);
    }

    // Deleta um brinquedo pelo ID fornecido
    public void deleteBrinquedo(Long id) {
        brinquedoRepository.deleteById(id);
    }
}
