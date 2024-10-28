document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/api/brinquedos'; // Certifique-se de que esta URL está correta
    const tableBody = document.querySelector('#brinquedosTable tbody');
    const createBtn = document.getElementById('createBtn');
    const viewBtn = document.getElementById('viewBtn');
    const backBtn = document.getElementById('backBtn');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const brinquedoForm = document.getElementById('brinquedoForm');
    const brinquedoId = document.getElementById('brinquedoId');
    const messageDiv = document.getElementById('message');

    let isFiltered = false;

    // Mapeamento do tipo de brinquedo para a imagem correspondente
    const tipoImagemMap = {
        'Eletrônico': 'eletronico.png',
        'Educativo': 'educativo.png',
        'Pelúcia': 'pelucia.png',
        'Construção': 'construcao.png',
        'Ação': 'acao.png',
        'Fantasia': 'fantasia.png',
        'Música': 'musica.png',
        'Arte': 'arte.png',
        'Jogos': 'jogos.png',
        'Esportes': 'esportes.png'
    };

    // Função para exibir mensagens de feedback ao usuário
    function showMessage(text, type = 'success') {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`; // Corrigido para usar crase e template literal
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    // Função para carregar e exibir os brinquedos na tabela
    function loadBrinquedos(filterName = '') {
        let fetchUrl = apiUrl;
        if (filterName) {
            // Adiciona o filtro de nome se houver um parâmetro fornecido
            fetchUrl += `?nome=${encodeURIComponent(filterName)}`;
        }
        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(data => {
                // Limpa o conteúdo anterior da tabela
                tableBody.innerHTML = '';
                if (data.length === 0) {
                    // Caso nenhum brinquedo seja encontrado, adiciona uma linha indicando isso
                    const row = document.createElement('tr');
                    row.innerHTML = `<td colspan="7" style="text-align: center;">Nenhum brinquedo encontrado.</td>`;
                    tableBody.appendChild(row);
                    return;
                }
                // Popula a tabela com os dados dos brinquedos
                data.forEach(brinquedo => {
                    const row = document.createElement('tr');

                    // Obter o nome da imagem correspondente ao tipo do brinquedo
                    const imagemArquivo = tipoImagemMap[brinquedo.tipo] || 'default.png';  // Usa uma imagem padrão se o tipo não for encontrado

                    row.innerHTML = `
                        <td><img src="images/${imagemArquivo}" alt="${brinquedo.tipo}" class="tipo-imagem"></td>
                        <td data-label="Nome">${brinquedo.nome}</td>
                        <td data-label="Tipo">${brinquedo.tipo}</td>
                        <td data-label="Classificação">${brinquedo.classificacao}</td>
                        <td data-label="Tamanho">${brinquedo.tamanho}</td>
                        <td data-label="Preço (R$)">${brinquedo.preco.toFixed(2)}</td>
                        <td data-label="Ações">
                            <button class="action-btn-table edit-btn" data-id="${brinquedo.id}"><i class="fas fa-edit"></i> Editar</button>
                            <button class="action-btn-table delete-btn" data-id="${brinquedo.id}"><i class="fas fa-trash-alt"></i> Deletar</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
                attachActionButtons();
            })
            .catch(error => {
                console.error('Erro ao carregar os brinquedos:', error);
                showMessage('Não foi possível carregar os brinquedos.', 'error');
            });
    }

    // Função para abrir o modal (tanto para criar quanto para editar um brinquedo)
    function openModal(mode, brinquedo = {}) {
        modal.style.display = 'block';
        if (mode === 'create') {
            modalTitle.textContent = 'Adicionar Brinquedo';
            brinquedoForm.reset();
            brinquedoId.value = '';
        } else if (mode === 'edit') {
            modalTitle.textContent = 'Editar Brinquedo';
            brinquedoId.value = brinquedo.id;
            document.getElementById('nome').value = brinquedo.nome;
            document.getElementById('tipo').value = brinquedo.tipo;
            document.getElementById('classificacao').value = brinquedo.classificacao;
            document.getElementById('tamanho').value = brinquedo.tamanho;
            document.getElementById('preco').value = brinquedo.preco;
        }
    }

    // Função para fechar o modal
    function closeModalFunc() {
        modal.style.display = 'none';
    }

    // Anexa eventos aos botões de ação na tabela (Editar e Deletar)
    function attachActionButtons() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                // Busca os detalhes do brinquedo pelo ID e abre o modal para edição
                fetch(`${apiUrl}/${id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro na resposta da rede');
                        }
                        return response.json();
                    })
                    .then(brinquedo => {
                        openModal('edit', brinquedo);
                    })
                    .catch(error => {
                        console.error('Erro ao buscar o brinquedo:', error);
                        showMessage('Não foi possível buscar os detalhes do brinquedo.', 'error');
                    });
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                if (confirm('Tem certeza de que deseja deletar este brinquedo?')) {
                    // Requisição para deletar o brinquedo
                    fetch(`${apiUrl}/${id}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Erro na resposta da rede');
                            }
                            showMessage('Brinquedo deletado com sucesso!', 'success');
                            loadBrinquedos(isFiltered ? searchInput.value.trim() : '');
                        })
                        .catch(error => {
                            console.error('Erro ao deletar o brinquedo:', error);
                            showMessage('Não foi possível deletar o brinquedo.', 'error');
                        });
                }
            });
        });
    }

    // Evento para abrir o modal de criação de brinquedo
    createBtn.addEventListener('click', function () {
        openModal('create');
    });

    // Evento para fechar o modal ao clicar no "x" ou fora do modal
    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            closeModalFunc();
        }
    });

    // Evento para enviar o formulário de criação/edição de brinquedo
    brinquedoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const id = brinquedoId.value;
        const nome = document.getElementById('nome').value.trim();
        const tipo = document.getElementById('tipo').value;
        const classificacao = parseInt(document.getElementById('classificacao').value);
        const tamanho = document.getElementById('tamanho').value.trim();
        const preco = parseFloat(document.getElementById('preco').value);

        const brinquedoData = { nome, tipo, classificacao, tamanho, preco };

        if (id) {
            // Atualizar brinquedo existente
            fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(brinquedoData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta da rede');
                    }
                    return response.json();
                })
                .then(() => {
                    closeModalFunc();
                    showMessage('Brinquedo atualizado com sucesso!', 'success');
                    loadBrinquedos(isFiltered ? searchInput.value.trim() : '');
                })
                .catch(error => {
                    console.error('Erro ao atualizar o brinquedo:', error);
                    showMessage('Não foi possível atualizar o brinquedo.', 'error');
                });
        } else {
            // Criar novo brinquedo
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(brinquedoData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta da rede');
                    }
                    return response.json();
                })
                .then(() => {
                    closeModalFunc();
                    showMessage('Brinquedo adicionado com sucesso!', 'success');
                    loadBrinquedos(isFiltered ? searchInput.value.trim() : '');
                })
                .catch(error => {
                    console.error('Erro ao adicionar o brinquedo:', error);
                    showMessage('Não foi possível adicionar o brinquedo.', 'error');
                });
        }
    });

    // Evento para filtrar brinquedos por nome
    viewBtn.addEventListener('click', function () {
        const nomeBusca = searchInput.value.trim();
        if (nomeBusca === '') {
            showMessage('Por favor, digite o nome do brinquedo para visualizar.', 'error');
            return;
        }

        fetch(`${apiUrl}?nome=${encodeURIComponent(nomeBusca)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    showMessage('Nenhum brinquedo encontrado com esse nome.', 'error');
                    return;
                }
                isFiltered = true;
                loadBrinquedos(nomeBusca);
                backBtn.style.display = 'inline-block';
                showMessage('Brinquedos filtrados com sucesso!', 'success');
            })
            .catch(error => {
                console.error('Erro ao filtrar os brinquedos:', error);
                showMessage('Não foi possível filtrar os brinquedos. Verifique o console para mais detalhes.', 'error');
            });
    });

    // Evento para retornar à visualização completa
    backBtn.addEventListener('click', function () {
        isFiltered = false;
        searchInput.value = '';
        loadBrinquedos();
        backBtn.style.display = 'none';
        showMessage('Visualização completa restaurada.', 'success');
    });

    // Inicializa a página carregando todos os brinquedos
    loadBrinquedos();
});
