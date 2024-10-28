package com.brinquedos.gestaobrinquedos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "BRINQUEDOS")
public class Brinquedo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Gera automaticamente o valor do ID, garantindo que cada brinquedo tenha um identificador único
    private Long id;

    private String nome;          // Nome do brinquedo
    private String tipo;          // Tipo ou categoria do brinquedo (ex.: Eletrônico, Educativo)
    private int classificacao;    // Classificação indicativa de idade ou segurança
    private String tamanho;       // Tamanho do brinquedo (ex.: Pequeno, Médio, Grande)
    private double preco;         // Preço do brinquedo

    // Getters e setters - métodos para acessar e modificar os atributos do brinquedo

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(int classificacao) {
        this.classificacao = classificacao;
    }

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }
}
