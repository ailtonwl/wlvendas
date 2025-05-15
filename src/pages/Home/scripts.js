// scripts.js
document.getElementById("usuario").addEventListener("click", function () {
  document.getElementById("content").innerHTML = "<h1>Home</h1><p>Bem-vindo à página inicial!</p>";
});

document.getElementById("about").addEventListener("click", function () {
  document.getElementById("content").innerHTML = "<h1>Sobre</h1><p>Saiba mais sobre nós aqui.</p>";
});

document.getElementById("contact").addEventListener("click", function () {
  document.getElementById("content").innerHTML = "<h1>Contato</h1><p>Entre em contato conosco.</p>";
});
