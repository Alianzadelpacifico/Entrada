document.addEventListener('DOMContentLoaded', function() {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const volverInicioBtn = document.getElementById('volverInicioBtn');
    const passwordDialog = document.getElementById('passwordDialog');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmarBtn = document.getElementById('confirmarBtn');
    const cancelarBtn = document.getElementById('cancelarBtn');
    const formulariosContainer = document.getElementById('formulariosContainer');

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

    // Obtener y mostrar los formularios desde la carpeta 'formularios' en GitHub
    const token = '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'; // Reemplaza con tu token de GitHub
    const repo = 'Alianzadelpacifico/Entrada'; // Reemplaza con tu repositorio

    fetch(`https://api.github.com/repos/${repo}/contents/formularios`, {
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(files => {
        files.forEach((file, index) => {
            if (file.name.endsWith('.json')) {
                fetch(`https://api.github.com/repos/${repo}/contents/formularios/${file.name}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.content) {
                        const formulario = JSON.parse(atob(data.content));
                        if (formulario.nombre && formulario.edad && formulario.nacionalidad && formulario.telefono && formulario.residencia && formulario.motivo && formulario.experiencia && formulario.empresaActual && formulario.categoria) {
                            const issueElement = document.createElement('div');
                            issueElement.classList.add('issue');
                            issueElement.innerHTML = `
                                <h2>Formulario N°${index + 1} <button class="toggle-btn">⬇️</button></h2>
                                <div class="issue-content hidden">
                                    <p>Nombre: ${formulario.nombre}</p>
                                    <p>Edad: ${formulario.edad}</p>
                                    <p>Nacionalidad: ${formulario.nacionalidad}</p>
                                    <p>Teléfono: ${formulario.telefono}</p>
                                    <p>Residencia: ${formulario.residencia}</p>
                                    <p>Motivo: ${formulario.motivo}</p>
                                    <p>Experiencia: ${formulario.experiencia}</p>
                                    <p>Empresa Actual: ${formulario.empresaActual}</p>
                                    <p>Categoría: ${formulario.categoria}</p>
                                    <div class="buttons">
                                        <button class="accept-btn" data-codigo="${formulario.codigoTicket}">Aceptar</button>
                                        <button class="reject-btn" data-codigo="${formulario.codigoTicket}">Rechazar</button>
                                    </div>
                                </div>
                            `;
                            formulariosContainer.appendChild(issueElement);

                            // Añadir evento de clic a los botones de flecha
                            const toggleButton = issueElement.querySelector('.toggle-btn');
                            toggleButton.addEventListener('click', function() {
                                const issueContent = this.parentElement.nextElementSibling;
                                issueContent.classList.toggle('hidden');
                            });

                            // Añadir eventos de clic a los botones de aceptar y rechazar
                            const acceptButton = issueElement.querySelector('.accept-btn');
                            const rejectButton = issueElement.querySelector('.reject-btn');

                            acceptButton.addEventListener('click', function() {
                                const codigo = this.getAttribute('data-codigo');
                                actualizarEstadoFormulario(codigo, 'accepted', 'Ha sido aceptado en Alianza del Pacífico, ¡Felicidades!');
                            });

                            rejectButton.addEventListener('click', function() {
                                const codigo = this.getAttribute('data-codigo');
                                actualizarEstadoFormulario(codigo, 'rejected', 'Lo siento mucho, no has sido aceptado en Alianza del Pacífico. Mejor suerte la próxima vez.');
                            });
                        }
                    } else {
                        console.error('Error al obtener el contenido del formulario:', data);
                    }
                })
                .catch(error => {
                    console.error('Error al obtener el formulario:', error);
                });
            }
        });
    })
    .catch(error => {
        console.error('Error al obtener los archivos:', error);
    });

    function actualizarEstadoFormulario(codigo, estado, mensaje) {
        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Entrada'; // Reemplaza con tu repositorio

        fetch(`https://api.github.com/repos/${repo}/contents/formularios/${codigo}.json`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.content) {
                const formulario = JSON.parse(atob(data.content));
                formulario.estado = estado;

                fetch(`https://api.github.com/repos/${repo}/contents/formularios/${codigo}.json`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: 'Actualizar estado del formulario',
                        content: btoa(JSON.stringify(formulario)),
                        sha: data.sha
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.content) {
                        alert(mensaje);
                    } else {
                        alert('Hubo un problema al actualizar el formulario.');
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar el formulario:', error);
                });
            } else {
                console.error('Error al obtener el contenido del formulario:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener el formulario:', error);
        });
    }
});