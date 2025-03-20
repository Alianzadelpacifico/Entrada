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

    // Mostrar mensaje de aceptación si el usuario ha sido aceptado
    const username = 'nombre_del_usuario'; // Reemplaza con el nombre de usuario actual
    const status = localStorage.getItem(`${username}_status`);
    if (status === 'accepted') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('acceptance-message');
        messageElement.textContent = 'Has sido aceptado en Alianza del Pacífico, ¡Felicidades!';
        rightPanel.appendChild(messageElement);
    }
});