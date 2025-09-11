// Funzione per deselezionare la checkbox
function deselezionaCheckbox() {
    const checkbox = document.getElementById("check");
    checkbox.checked = false;
}

// Media query per larghezze minori di 800px
window.addEventListener('resize', function () {
    if (window.innerWidth > 800) {
        deselezionaCheckbox(); // Deselezioniamo la checkbox
    }
});

// Verifica iniziale
if (window.innerWidth < 800) {
    deselezionaCheckbox(); // Deseleziona se la larghezza è già inferiore a 950px
}
const checkbox = document.getElementById("check");
const header = document.querySelector(".header");

checkbox.addEventListener("change", function () {
    if (this.checked) {
        header.style.boxShadow = "none";
    } else {
        header.style.boxShadow = "0 5px 10px rgba(0, 0, 0, .3)";
    }
});

// Seleziona tutti i link della navbar
const navLinks = document.querySelectorAll(".navbar a");

// Aggiungi un click listener a ciascun link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Deseleziona la checkbox
        deselezionaCheckbox();
        // Ripristina l'ombra dell'header
        header.style.boxShadow = "0 5px 10px rgba(0, 0, 0, .3)";
    });
});

const riempimenti = document.querySelectorAll('.riempimento');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const percent = entry.target.getAttribute('data-percent');
      entry.target.style.width = percent + '%';
    }
    else {
      // Quando esce dal viewport → resetta
      entry.target.style.width = 0;
    }
  });
}, {
  threshold: 0.5 // parte a riempirsi quando metà della barra è visibile
});

riempimenti.forEach(bar => observer.observe(bar));

const sections = document.querySelectorAll("section");
let index = 0;
let isScrolling = false;

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && index < sections.length - 1) {
    index++;
  } else if (e.deltaY < 0 && index > 0) {
    index--;
  }

  sections[index].scrollIntoView({ behavior: "smooth" });

  setTimeout(() => isScrolling = false, 1000); // evita scroll multipli
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function(e) {
  status.textContent = "Invio in corso...";
});