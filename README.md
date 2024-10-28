![Happy-Box.png](https://github.com/user-attachments/assets/07f72551-c80d-496c-83cb-8a57dce926c6)

# 📦 **Happy Box - Toy Management System**

## 📜 **Descrição do Projeto**

Este projeto foi desenvolvido como parte do CheckPoint 2 para a matéria de **Java Advanced** no curso de Tecnologia em Análise e Desenvolvimento de Sistemas da FIAP 🎓. O objetivo era criar um sistema de gerenciamento de brinquedos para uma loja fictícia 🧸, utilizando o framework **Spring Boot** 🌀 com persistência de dados em um banco **Oracle** 🗄️. O projeto inclui uma interface web moderna e funcional 🌐, que permite realizar operações de **CRUD** (Create ➕, Read 🔍, Update ✏️, Delete ❌) e visualizar todos os brinquedos de forma clara e organizada 📊.

### 📚 **Resumo**

- **Framework utilizado**: Spring Boot configurado para o tipo Maven.
- **Linguagem**: Java ☕.
- **Banco de dados**: Oracle SQL Developer 🗄️, com configurações definidas no `application.properties`.
- **Interface Web**: Desenvolvida com **HTML**, **CSS** e **JavaScript** 🌐, consumindo os dados da API RESTful.
- **Testes**: Testes realizados via **Postman** 🧪 para validar a API e todas as operações CRUD.

## 🛠️ **Tecnologias Utilizadas**

- **Back-end**: Spring Boot, Spring Data JPA, Maven ⚙️.
- **Banco de Dados**: Oracle SQL Developer 🗃️.
- **Front-end**: HTML, CSS, JavaScript (fetch API) 🎨.
- **Testes de API**: Postman 🧪.

## 🚀 **Funcionalidades do Sistema**

### 🌟 **Back-end (API RESTful)**

O sistema de gerenciamento de brinquedos foi desenvolvido utilizando Spring Boot, com endpoints que permitem:

- **Criar Brinquedo (POST)** ➕: Permite adicionar um novo brinquedo ao sistema.
- **Consultar Todos os Brinquedos (GET)** 🔍: Retorna todos os brinquedos cadastrados.
- **Consultar Brinquedo por ID (GET)** 🆔: Retorna um brinquedo específico através de seu identificador único.
- **Atualizar Brinquedo (PUT)** ✏️: Atualiza as informações de um brinquedo existente.
- **Deletar Brinquedo (DELETE)** ❌: Remove um brinquedo do sistema.

Todos esses endpoints foram testados utilizando **Postman** 🛠️, garantindo que o sistema está funcionando corretamente conforme esperado. Os prints e exemplos JSON estarão disponíveis mais adiante neste repositório.

#### **Endpoints Implementados**

1. **GET /api/brinquedos**: Retorna todos os brinquedos ou filtra por nome.
   - **Link para testar no navegador**: [http://localhost:8080/api/brinquedos](http://localhost:8080/api/brinquedos)
2. **GET /api/brinquedos/{id}**: Retorna um brinquedo específico pelo ID.
3. **POST /api/brinquedos**: Cria um novo brinquedo.
4. **PUT /api/brinquedos/{id}**: Atualiza um brinquedo pelo ID.
5. **DELETE /api/brinquedos/{id}**: Deleta um brinquedo específico.

 **Exemplo de JSON para Criar Brinquedo** 📄

```json
{
  "nome": "Carrinho Super Veloz",
  "tipo": "Veículo",
  "classificacao": 6,
  "tamanho": "Médio",
  "preco": 49.99
}
```
### 📊 **Banco de Dados (Oracle SQL Developer)**

O banco de dados Oracle foi utilizado para armazenar as informações dos brinquedos. A tabela contém as seguintes colunas:

- **ID**: Identificador único do brinquedo 🔑.
- **Nome**: Nome do brinquedo 🏷️.
- **Tipo**: Tipo ou categoria do brinquedo (e.g., Eletrônico, Educativo) 🧸.
- **Classificação**: Classificação indicativa do brinquedo 👶👦👧.
- **Tamanho**: Tamanho do brinquedo (Pequeno, Médio, Grande) 📏.
- **Preço**: Preço do brinquedo 💲.

A conexão com o banco de dados foi configurada no arquivo `application.properties`, utilizando o driver do Oracle e as credenciais fornecidas pela FIAP.

 **Exemplo de Configuração no application.properties** 📝:

```markdown
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### 💻 **Front-end (Interface do Usuário)**

A interface web foi projetada para ser simples e intuitiva, utilizando **HTML**, **CSS** e **JavaScript** 🖥️ para criar uma experiência fluida ao usuário. As funcionalidades principais incluem:

- **Visualização dos brinquedos cadastrados** 📋: Através de uma tabela que exibe todos os brinquedos, com detalhes como nome, tipo, classificação, tamanho e preço.
- **Adição e Edição de Brinquedos** ✨: Um modal (pop-up) permite ao usuário adicionar um novo brinquedo ou editar um brinquedo existente.
- **Filtro de Brinquedo por Nome** 🔎: Um campo de pesquisa para buscar brinquedos pelo nome e exibi-los na tabela.
- **Deleção de Brinquedos** 🗑️: Ação que permite excluir um brinquedo.
- **Imagens dos Brinquedos** 🖼️: Cada brinquedo possui uma imagem ilustrativa baseada em sua categoria (e.g., Eletrônicos, Educativos), que é exibida na tabela.

### 🎨 **Detalhes de Estilo e Interatividade**

- **Modal de Criação/Edição** 📝: O modal é responsivo, permitindo ao usuário cadastrar ou atualizar brinquedos facilmente.

### 🔄 **Fluxo de Operações CRUD**

1. **Criar Brinquedo (POST)** ➕
   - A partir do botão "Adicionar Brinquedo" na interface, o modal é aberto, onde o usuário pode preencher os detalhes do brinquedo.
   - O formulário então envia os dados via **fetch** para o endpoint `/api/brinquedos`.

2. **Ler Brinquedos (GET)** 📖
   - Todos os brinquedos são carregados assim que a página é aberta, consumindo o endpoint `/api/brinquedos`.
   - Também é possível buscar um brinquedo específico por meio do campo de pesquisa, que consulta a API.

3. **Atualizar Brinquedo (PUT)** ✏️
   - Ao clicar no botão "Editar", o modal é preenchido automaticamente com os dados do brinquedo, permitindo ao usuário fazer alterações e salvar.

4. **Deletar Brinquedo (DELETE)** 🗑️
   - O botão "Deletar" remove o brinquedo selecionado da lista e envia a requisição ao endpoint para removê-lo do banco de dados.

### 🔐 **Segurança e Controle de Acesso (CORS)**

Foi configurado **CORS** para permitir que a interface (rodando em `localhost:8080`) pudesse acessar a API sem problemas de bloqueio de origem cruzada, garantindo assim uma comunicação tranquila entre o front-end e o back-end.

 **Configuração de CORS** 🔒:

```markdown
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:8080")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```
## 📋 **Como Executar o Projeto**

### **Pré-requisitos**

- **Java 23** (versão mais recente) instalado. ⚠️ Observação: não garantimos que todas as funcionalidades funcionarão da mesma forma em versões mais antigas do Java.
- **Maven** instalado e configurado em seu ambiente.
- **Oracle SQL Developer** ou outra ferramenta compatível para configurar o banco de dados Oracle.
- **Navegador Web** para acessar a interface gráfica.

 **Nota**: O desenvolvimento do projeto foi feito utilizando a IDE **IntelliJ** 🖥️, e todos os testes de funcionamento foram realizados nesta IDE. Não testamos o funcionamento em outra IDE.

### **Passos para Executar**

1. **Configurar o Banco de Dados**: Certifique-se de que o Oracle Database está configurado e rodando. Se quiser verificar os dados da tabela Brinquedos no banco, acesse o Oracle com minhas credenciais disponíveis no arquivo `application.properties`.

2. **Executar o Back-end**: Rode o comando `mvn spring-boot:run` para iniciar o servidor back-end ou clique em executar.

3. **Acessar o Front-end**: Abra o navegador e navegue até ou [http://localhost:8080](http://localhost:8080) ou [http://localhost:8080/index.html](http://localhost:8080/index.html) para acessar a interface do usuário e interagir com a aplicação.

4. **Visualizar Dados da API**: Para verificar os dados em formato JSON, acesse [http://localhost:8080/api/brinquedos](http://localhost:8080/api/brinquedos).

## 👥 **Equipe de Desenvolvimento**

- **Daniel Bezerra da Silva Melo (RM553792)** 
- **Deyckson Roberto de Resende (RM553607)** 
- **Gustavo Rocha Caxias (RM553310)** 
- **Macauly Vivaldo da Silva (RM553350)** 
- **William Kenzo Hayashi (RM552659)** 

## 🗒️ **Notas Finais**

Todos os requisitos do CheckPoint 2 foram atendidos, incluindo:

- **Implementação completa do CRUD** ✅.
- **Persistência dos dados em banco Oracle** 🗄️.
- **Testes via Postman** 🧪.
- **(Opcional) Interface web funcional e moderna** 💻.

### **Print da tela com a configuração final do Spring Initializr da criação no inicio do projeto**

![Spring-Initializr.png](https://github.com/user-attachments/assets/30f0343c-a782-4685-adf9-e3b9dbc8bb8c)
