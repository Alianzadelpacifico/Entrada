document.addEventListener('DOMContentLoaded', function() {
    const codigoTicket = localStorage.getItem('codigoTicket');
    if (codigoTicket) {
        document.getElementById('codigoTicket').textContent = `Código: ${codigoTicket}`;
    }

    const menuBtn = document.getElementById('menuBtn');
    const leftPanel = document.getElementById('leftPanel');
    const rightPanel = document.querySelector('.right-panel');

    menuBtn.addEventListener('click', function() {
        leftPanel.classList.toggle('open');
        rightPanel.classList.toggle('shrink');
    });

    const paises = [
        { nombre: "Argentina", codigo: "+54" },
        { nombre: "Bolivia", codigo: "+591" },
        { nombre: "Chile", codigo: "+56" },
        { nombre: "Colombia", codigo: "+57" },
        { nombre: "Costa Rica", codigo: "+506" },
        { nombre: "Cuba", codigo: "+53" },
        { nombre: "Ecuador", codigo: "+593" },
        { nombre: "El Salvador", codigo: "+503" },
        { nombre: "España", codigo: "+34" },
        { nombre: "Estados Unidos", codigo: "+1" },
        { nombre: "Guatemala", codigo: "+502" },
        { nombre: "Honduras", codigo: "+504" },
        { nombre: "México", codigo: "+52" },
        { nombre: "Nicaragua", codigo: "+505" },
        { nombre: "Panamá", codigo: "+507" },
        { nombre: "Paraguay", codigo: "+595" },
        { nombre: "Perú", codigo: "+51" },
        { nombre: "Puerto Rico", codigo: "+1-787" },
        { nombre: "República Dominicana", codigo: "+1-809" },
        { nombre: "Uruguay", codigo: "+598" },
        { nombre: "Venezuela", codigo: "+58" }
    ];

    const nacionalidadSelect = document.getElementById('nacionalidad');
    const codigoPaisInput = document.getElementById('codigoPais');

    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais.codigo;
        option.textContent = pais.nombre;
        nacionalidadSelect.appendChild(option);
    });

    nacionalidadSelect.addEventListener('change', function() {
        const selectedOption = nacionalidadSelect.options[nacionalidadSelect.selectedIndex];
        codigoPaisInput.value = selectedOption.value;
    });

    const formulario = document.getElementById('formularioIngreso');
    const mensajeAdvertencia = document.getElementById('mensajeAdvertencia');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(formulario);
        const nombre = formData.get('nombre');
        const edad = formData.get('edad');
        const nacionalidad = formData.get('nacionalidad');
        const telefono = formData.get('telefono');
        const residencia = formData.get('residencia');
        const motivo = formData.get('motivo');
        const experiencia = formData.get('experiencia');
        const empresaActual = formData.get('empresaActual');
        const categoria = formData.get('categoria');

        // Validar campos obligatorios
        if (!nombre || !edad || !nacionalidad || !telefono || !residencia || !motivo || !experiencia || !empresaActual || !categoria) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        const data = {
            nombre: nombre,
            edad: edad,
            nacionalidad: nacionalidad,
            telefono: telefono,
            residencia: residencia,
            motivo: motivo,
            experiencia: experiencia,
            empresaActual: empresaActual,
            categoria: categoria,
            codigoTicket: codigoTicket
        };

        guardarFormularioEnGitHub(codigoTicket, data);
    });

    function guardarFormularioEnGitHub(codigo, formulario) {
        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/formulario'; // Reemplaza con tu repositorio
        const path = `formularios/${codigo}2.json`; // Ruta donde se guardará el archivo

        const contenido = JSON.stringify(formulario);

        fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Guardar formulario',
                content: btoa(contenido)
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Formulario guardado en GitHub:', data);
            alert('Formulario enviado exitosamente');
        })
        .catch(error => {
            console.error('Error al guardar el formulario en GitHub:', error);
            alert('Hubo un problema al enviar el formulario.');
        });
    }

    // Mostrar mensaje de aceptación o rechazo si el usuario ha sido aceptado o rechazado
    if (codigoTicket) {
        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Formulario'; // Reemplaza con tu repositorio

        fetch(`https://api.github.com/repos/${repo}/contents/formularios/${codigoTicket}.json`, {
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
                if (formulario.estado === 'accepted') {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('acceptance-message');
                    messageElement.innerHTML = `
                        Has sido aceptado en Alianza del Pacífico, ¡Felicidades!
                        <button id="aceptarBtn">Aceptar</button>
                    `;
                    rightPanel.appendChild(messageElement);

                    const aceptarBtn = document.getElementById('aceptarBtn');
                    aceptarBtn.addEventListener('click', function() {
                        eliminarTodosLosFormularios();
                    });
                } else if (formulario.estado === 'rejected') {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('rejection-message');
                    messageElement.innerHTML = `
                        Lo siento mucho, no has sido aceptado en Alianza del Pacífico. Mejor suerte la próxima vez.
                        <button id="aceptarBtn">Aceptar</button>
                    `;
                    rightPanel.appendChild(messageElement);

                    const aceptarBtn = document.getElementById('aceptarBtn');
                    aceptarBtn.addEventListener('click', function() {
                        eliminarTodosLosFormularios();
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

    function eliminarTodosLosFormularios() {
        const token = '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'; // Reemplaza con tu token de GitHub
        const repo = 'Alianzadelpacifico/Formulario'; // Reemplaza con tu repositorio

        fetch(`https://api.github.com/repos/${repo}/contents/formularios`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(files => {
            const deletePromises = files.map(file => {
                if (file.name.endsWith('.json')) {
                    return fetch(`https://api.github.com/repos/${repo}/contents/formularios/${file.name}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `token ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: 'Eliminar formulario',
                            sha: file.sha
                        })
                    });
                }
            });

            return Promise.all(deletePromises);
        })
        .then(results => {
            alert('Todos los formularios han sido eliminados exitosamente');
            localStorage.removeItem('codigoTicket');
            window.location.href = 'user o admin.html';
        })
        .catch(error => {
            console.error('Error al eliminar los formularios:', error);
        });
    }
});
