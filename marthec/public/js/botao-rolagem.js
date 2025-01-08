// script.js

// Obtém o botão
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Quando o usuário rolar a página, mostre ou oculte o botão
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block"; // Mostra o botão
    } else {
        scrollToTopBtn.style.display = "none"; // Esconde o botão
    }
};

// Quando o usuário clicar no botão, rola suavemente para o topo
scrollToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
};
