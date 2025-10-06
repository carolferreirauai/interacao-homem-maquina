document.addEventListener('DOMContentLoaded', () => {
    const notaInput = document.getElementById('notaInput');
    const labelNota = document.getElementById('label-nota');
    const valorNota = document.getElementById('valor-nota');

    notaInput.addEventListener('input', () => {
        const nota = parseFloat(notaInput.value);
        
        if (isNaN(nota) || notaInput.value === "") {
            valorNota.textContent = "--";
            labelNota.style.backgroundColor = '#ccc'; // Cor cinza padrão
            return;
        }
        
        valorNota.textContent = nota.toFixed(1);

        if (nota < 6) {
            labelNota.style.backgroundColor = 'red';
        } else if (nota >= 6 && nota < 8) {
            labelNota.style.backgroundColor = 'orange';
        } else {
            labelNota.style.backgroundColor = 'green';
        }
    });
});