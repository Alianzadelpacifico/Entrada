document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ingresoForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const action = formData.get('action');
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const password = formData.get('password');

        if (action === 'crear_cuenta') {
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
                }
            } catch (error) {
                console.warn('El archivo no existe, se creará uno nuevo.');
            }

            // Convierte los datos en Base64 correctamente
            const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(data))));

            const body = {
                message: sha ? 'Actualizar cuenta existente' : 'Crear nueva cuenta',
                content: encodedData,
                sha: sha // Si el archivo ya existe, GitHub requiere el SHA
            };

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                if (data.content) {
                    alert('Cuenta creada exitosamente, por favor inicie sesión');
                    // No redirige a Bienvenida.html
                } else {
                    alert('Hubo un problema al crear la cuenta.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema con la solicitud');
            });
        }
    });
});
