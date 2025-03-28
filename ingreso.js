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
        const path = `${nombre}.json`; // Ruta del archivo en el repositorio

        const url = `https://api.github.com/repos/${repo}/contents/${path}`;

        let sha = null;

        try {
            // Verifica si el archivo ya existe en GitHub
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            if (response.ok) {
                const fileData = await response.json();
                sha = fileData.sha; // Obtiene el SHA para actualizar el archivo
            } else {
                console.warn('El archivo no existe, se creará uno nuevo.');
            }
        } catch (error) {
            console.warn('Error al intentar verificar la existencia del archivo. El archivo no existe, se creará uno nuevo.');
        }

        // Convierte los datos en Base64 correctamente
        const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(data))));

        const body = {
            message: sha ? 'Actualizar cuenta existente' : 'Crear nueva cuenta',
            content: encodedData,
            sha: sha // Si el archivo ya existe, GitHub requiere el SHA
        };

        try {
            // Llamada PUT para crear o actualizar el archivo en el repositorio
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
