// script.js

// Obtém o botão de rolagem
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Quando o usuário rolar a página, mostre ou oculte o botão de rolagem
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block"; // Mostra o botão de voltar ao topo
    } else {
        scrollToTopBtn.style.display = "none"; // Esconde o botão
    }
};

// Quando o usuário clicar no botão de voltar ao topo, rola suavemente para o topo
scrollToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
};
