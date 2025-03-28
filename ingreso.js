document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ingresoForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera convencional

        const formData = new FormData(form);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const password = formData.get('password');

        if (!nombre || !email || !password) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        const data = {
            nombre: nombre,
            email: email,
            password: password
        };

        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Entrada'; // Reemplaza con tu repositorio
        const path = `${nombre}.json`; // Ruta del archivo en el repositorio (nombre dinámico)

        const url = `https://api.github.com/repos/${repo}/contents/${path}`;

        // Convierte los datos en Base64 correctamente
        const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(data))));

        const body = {
            message: 'Crear nueva cuenta', // Mensaje para el commit
            content: encodedData, // Datos en base64 que se van a guardar en el archivo
        };

        try {
            // Llamada PUT para crear un nuevo archivo en el repositorio
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();
            if (result.content) {
                alert('Cuenta creada exitosamente, por favor inicie sesión');
                // Redirige a otra página si lo deseas:
                // window.location.href = 'Bienvenida.html';
            } else {
                alert('Hubo un problema al crear la cuenta.');
            }
        } catch (error) {
            console.error('Error al crear la cuenta:', error);
            alert('Hubo un problema con la solicitud.');
        }
    });
});
