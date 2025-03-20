document.addEventListener('DOMContentLoaded', function() {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const volverInicioBtn = document.getElementById('volverInicioBtn');
    const passwordDialog = document.getElementById('passwordDialog');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');

    cerrarSesionBtn.addEventListener('click', function() {
        passwordDialog.classList.remove('hidden');
    });

    confirmarBtn.addEventListener('click', function() {
        const nombre = usernameInput.value;
        const password = passwordInput.value;
        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Entrada'; // Reemplaza con tu repositorio

        fetch(`https://api.github.com/repos/${repo}/contents/${nombre}.json`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.content) {
                const userData = JSON.parse(atob(data.content));
                if (userData.password === password) {
                    localStorage.removeItem('sesionIniciada');
                    alert('Sesión cerrada exitosamente');
                    cerrarSesionBtn.classList.add('hidden');
                    volverInicioBtn.classList.remove('hidden');
                    passwordDialog.classList.add('hidden');
                } else {
                    alert('Contraseña incorrecta');
                }
            } else {
                alert('No se encontraron datos del usuario.');
            }
        })
        .catch(error => {
            console.error('Error al verificar los datos del usuario:', error);
            alert('Hubo un problema al verificar los datos del usuario.');
        });
    });

    cancelarBtn.addEventListener('click', function() {
        window.location.href = 'admin.html';
    });

    volverInicioBtn.addEventListener('click', function() {
        window.location.href = 'user o admin.html';
    });
});