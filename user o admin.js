document.addEventListener('DOMContentLoaded', function() {
    const adminBtn = document.getElementById('adminBtn');
    const usuarioBtn = document.getElementById('usuarioBtn');

    adminBtn.addEventListener('click', function() {
        window.location.href = 'ingreso.html';
    });

    usuarioBtn.addEventListener('click', function() {
        const codigoTicket = localStorage.getItem('codigoTicket'); // Asume que el código de ticket está guardado en localStorage
        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Entrada'; // Reemplaza con tu repositorio

        fetch(`https://api.github.com/repos/${repo}/contents/formularios/${codigoTicket}.json`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('No se encontró el código');
            }
        })
        .then(data => {
            if (data.content) {
                window.location.href = 'Formulario.html';
            } else {
                alert('No se encontró un código para este usuario. Redirigiendo a la página de solicitud de ticket.');
                window.location.href = 'Interfaz.html';
            }
        })
        .catch(error => {
            console.error('Error al obtener el código del usuario:', error);
            alert('Hubo un problema al obtener el código del usuario. Redirigiendo a la página de solicitud de ticket.');
            window.location.href = 'Interfaz.html';
        });
    });
});