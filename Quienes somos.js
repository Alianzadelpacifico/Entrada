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
});