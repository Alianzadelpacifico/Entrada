document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ingresoForm');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const action = formData.get('action');
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const password = formData.get('password');

        if (action === 'crear_cuenta') {
            // Verificar el número de cuentas creadas
            let cuentasCreadas = localStorage.getItem('cuentasCreadas');
            cuentasCreadas = cuentasCreadas ? parseInt(cuentasCreadas) : 0;

            if (cuentasCreadas >= 2) {
                alert('Se ha alcanzado el límite máximo de dos cuentas.');
                return;
            }

            // Validar campos obligatorios
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

            fetch(`https://api.github.com/repos/${repo}/contents/${nombre}.json`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Crear nueva cuenta',
                    content: btoa(JSON.stringify(data))
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.content) {
                    alert('Cuenta creada exitosamente');
                    localStorage.setItem('cuentasCreadas', cuentasCreadas + 1);
                    window.location.href = 'Bienvenida.html';
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

    // Validar campos solo cuando se va a crear una cuenta
    form.addEventListener('click', function(event) {
        const action = event.target.value;
        if (action === 'crear_cuenta') {
            nombreInput.required = true;
            emailInput.required = true;
            passwordInput.required = true;
        }
    });
});
