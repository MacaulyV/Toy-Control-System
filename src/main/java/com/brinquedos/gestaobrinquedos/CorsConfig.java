package com.brinquedos.gestaobrinquedos;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Configura o CORS para permitir que o frontend (localhost:8080) faça requisições à API
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:8080",
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Define quais métodos HTTP são permitidos
                        .allowedHeaders("*") // Permite todos os cabeçalhos
                        .allowCredentials(true); // Permite o envio de credenciais (cookies, autenticação HTTP, etc.)
            }
        };
    }
}
