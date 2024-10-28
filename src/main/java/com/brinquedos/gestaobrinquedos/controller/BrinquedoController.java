package com.brinquedos.gestaobrinquedos.controller;

import com.brinquedos.gestaobrinquedos.model.Brinquedo;
import com.brinquedos.gestaobrinquedos.service.BrinquedoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brinquedos")
public class BrinquedoController {

    @Autowired
    private BrinquedoService brinquedoService;

    // Retorna todos os brinquedos ou, se um nome for fornecido, apenas os brinquedos que correspondem ao nome
    @GetMapping
    public List<Brinquedo> getAllBrinquedos(@RequestParam(required = false) String nome) {
        if (nome != null && !nome.isEmpty()) {
            return brinquedoService.getBrinquedosByNome(nome);
        }
        return brinquedoService.getAllBrinquedos();
    }

    // Busca um brinquedo específico pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Brinquedo> getBrinquedoById(@PathVariable Long id) {
        return brinquedoService.getBrinquedoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Adiciona um novo brinquedo ao sistema
    @PostMapping
    public ResponseEntity<Brinquedo> createBrinquedo(@RequestBody Brinquedo brinquedo) {
        try {
            Brinquedo newBrinquedo = brinquedoService.saveBrinquedo(brinquedo);
            return ResponseEntity.ok(newBrinquedo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Atualiza as informações de um brinquedo existente
    @PutMapping("/{id}")
    public ResponseEntity<Brinquedo> updateBrinquedo(@PathVariable Long id, @RequestBody Brinquedo brinquedo) {
        return brinquedoService.getBrinquedoById(id)
                .map(existingBrinquedo -> {
                    // Garante que o ID do brinquedo não será alterado durante a atualização
                    brinquedo.setId(existingBrinquedo.getId());
                    Brinquedo updatedBrinquedo = brinquedoService.saveBrinquedo(brinquedo);
                    return ResponseEntity.ok(updatedBrinquedo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deleta um brinquedo pelo ID, caso exista
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrinquedo(@PathVariable Long id) {
        if (brinquedoService.getBrinquedoById(id).isPresent()) {
            brinquedoService.deleteBrinquedo(id);
            return ResponseEntity.noContent().build(); // Retorna 204 se a exclusão for bem-sucedida
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
