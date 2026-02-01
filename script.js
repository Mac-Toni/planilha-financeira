// --- Lógica de Persistência e Cálculos ---
let graficoFinanceiro; 

// 1. Carregar dados ao abrir a página
window.onload = () => { 
    const dadosSalvos = JSON.parse(localStorage.getItem('minhaPlanilha'));
    
    if (dadosSalvos && (dadosSalvos.receitas.length > 0 || dadosSalvos.despesas.length > 0)) {
        dadosSalvos.receitas.forEach(item => add('tabReceitas', item.nome, item.valor));
        dadosSalvos.despesas.forEach(item => add('tabDespesas', item.nome, item.valor));
    } else {
        add('tabReceitas'); 
        add('tabDespesas'); 
    }
    calc();
};

// 2. Adicionar linhas
function add(id, nome = '', valor = '') {
    const corpo = document.querySelector(`#${id} tbody`);
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" placeholder="Item" value="${nome}" oninput="calc()"></td>
        <td><input type="number" class="val" placeholder="0" value="${valor}" oninput="calc()" style="width: 70px;"></td>
        <td><button class="btn-win95" onclick="this.closest('tr').remove();calc()"><span class="x-vermelho">X</span></button></td>
    `;
    corpo.appendChild(tr);
    calc();
}

// 3. Função principal de cálculo
function calc() {
    let r = 0, d = 0;
    let listaRec = [], listaDes = [];

    // Soma Receitas
    document.querySelectorAll("#tabReceitas tr").forEach(tr => {
        const nomeInput = tr.querySelector('input[type="text"]');
        const valorInput = tr.querySelector('.val');
        if (nomeInput && valorInput) {
            const nome = nomeInput.value;
            const valor = parseFloat(valorInput.value) || 0;
            r += valor;
            if(nome || valor) listaRec.push({nome, valor});
        }
    });

    // Soma Despesas
    document.querySelectorAll("#tabDespesas tr").forEach(tr => {
        const nomeInput = tr.querySelector('input[type="text"]');
        const valorInput = tr.querySelector('.val');
        if (nomeInput && valorInput) {
            const nome = nomeInput.value;
            const valor = parseFloat(valorInput.value) || 0;
            d += valor;
            if(nome || valor) listaDes.push({nome, valor});
        }
    });
    
    const s = r - d;
    const f = (v) => v.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    // Atualiza Interface
    document.getElementById("vRec").innerText = f(r);
    document.getElementById("vDes").innerText = f(d);
    
    let statusEmoji = s > 0 ? "💰 (Poupando)" : s < 0 ? "⚠️ (No Vermelho)" : "😐";
    document.getElementById("vTotal").innerText = `${f(s)} ${statusEmoji}`;
    document.getElementById("vTotal").style.color = s >= 0 ? "#27ae60" : "#e74c3c";

    // SALVA E ATUALIZA O GRÁFICO
    localStorage.setItem('minhaPlanilha', JSON.stringify({ receitas: listaRec, despesas: listaDes }));
    atualizarGrafico(r, d); // Chamei a função aqui!
}

// 4. Função do Gráfico (Fora da calc)
function atualizarGrafico(receitas, despesas) {
    const canvas = document.getElementById('meuGrafico');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');

    if (graficoFinanceiro) {
        graficoFinanceiro.destroy();
    }

    graficoFinanceiro = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ganhos', 'Gastos'],
            datasets: [{
                label: 'R$ Valores',
                data: [receitas, despesas],
                backgroundColor: ['#27ae60', '#e74c3c'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

// 5. Limpar e Exportar
function limparTudo() {
    if(confirm("Deseja apagar todos os dados?")) {
        localStorage.removeItem('minhaPlanilha');
        location.reload();
    }
}

function exportarRelatorio() {
    const r = document.getElementById("vRec").innerText;
    const d = document.getElementById("vDes").innerText;
    const s = document.getElementById("vTotal").innerText;
    alert(`--- RELATÓRIO ---\nReceitas: ${r}\nDespesas: ${d}\nSaldo: ${s}`);
}