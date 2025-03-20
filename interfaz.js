document.addEventListener('DOMContentLoaded', function() {
    const solicitarTicketBtn = document.getElementById('solicitarTicketBtn');
    const codigoTicket = document.getElementById('codigoTicket');
    const continuarBtn = document.getElementById('continuarBtn');
    const mensajeTiempoRestante = document.createElement('p');
    mensajeTiempoRestante.id = 'mensajeTiempoRestante';
    document.querySelector('.container').appendChild(mensajeTiempoRestante);

    const MILISEGUNDOS_EN_10_SEGUNDOS = 10 * 1000; // 10 segundos

    function actualizarTiempoRestante() {
        const ultimoCodigoTimestamp = localStorage.getItem('ultimoCodigoTimestamp');
        if (ultimoCodigoTimestamp) {
            const tiempoRestante = MILISEGUNDOS_EN_10_SEGUNDOS - (Date.now() - parseInt(ultimoCodigoTimestamp));
            if (tiempoRestante > 0) {
                const segundos = Math.floor(tiempoRestante / 1000);
                mensajeTiempoRestante.textContent = `Puedes solicitar otro en ${segundos}s`;
                solicitarTicketBtn.disabled = true;
                setTimeout(actualizarTiempoRestante, 1000);
            } else {
                mensajeTiempoRestante.textContent = '';
                solicitarTicketBtn.disabled = false;
            }
        }
    }

    solicitarTicketBtn.addEventListener('click', function() {
        const ultimoCodigoTimestamp = localStorage.getItem('ultimoCodigoTimestamp');
        if (ultimoCodigoTimestamp && (Date.now() - parseInt(ultimoCodigoTimestamp)) < MILISEGUNDOS_EN_10_SEGUNDOS) {
            mensajeTiempoRestante.classList.add('vibrar');
            setTimeout(() => mensajeTiempoRestante.classList.remove('vibrar'), 300);
        } else {
            const codigo = generarCodigoAleatorio(8);
            codigoTicket.textContent = `Este es tu código: ${codigo}. No lo pierdas.`;
            codigoTicket.classList.remove('hidden');
            continuarBtn.classList.remove('hidden');
            localStorage.setItem('ultimoCodigoTimestamp', Date.now().toString());
            localStorage.setItem('codigoTicket', codigo);
            guardarCodigoEnGitHub(codigo);
            actualizarTiempoRestante();
        }
    });

    continuarBtn.addEventListener('click', function() {
        window.location.href = 'Formulario.html';
    });

    function generarCodigoAleatorio(length) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let resultado = '';
        for (let i = 0; i < length; i++) {
            resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return resultado;
    }

    function guardarCodigoEnGitHub(codigo) {
        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Entrada'; // Reemplaza con tu repositorio
        const path = `formularios/${codigo}.json`; // Ruta donde se guardará el archivo

        const contenido = JSON.stringify({ codigo });

        fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Guardar código generado',
                content: btoa(contenido)
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Archivo guardado en GitHub:', data);
        })
        .catch(error => {
            console.error('Error al guardar el archivo en GitHub:', error);
        });
    }

    actualizarTiempoRestante();
});