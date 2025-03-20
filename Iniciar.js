document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const nombre = formData.get('nombre');
        const password = formData.get('password');

        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Entrada'; // Reemplaza con tu repositorio

        fetch(`https://api.github.com/repos/${repo}/${nombre}.json`, {
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
                    alert('Inicio de sesión exitoso');
                    localStorage.setItem('sesionIniciada', 'true');
                    window.location.href = 'admin.html';
                } else {
                    alert('Contraseña incorrecta');
                }
            } else {
                alert('Usuario no encontrado');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud');
        });
    });
});
