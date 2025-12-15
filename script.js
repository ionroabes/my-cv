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

const sections = Array.from(document.querySelectorAll("section"));
let index = 0;
let isScrolling = false;

// aggiorna index in base a dove sei davvero
function syncIndexToViewport() {
  const y = window.scrollY + window.innerHeight / 2;
  index = sections.findIndex(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    return y >= top && y < bottom;
  });
  if (index === -1) index = 0;
}

window.addEventListener("scroll", () => {
  if (!isScrolling) syncIndexToViewport();
});

window.addEventListener("wheel", (e) => {
  // se stai usando un input "strano" (touchpad), evita blocchi aggressivi
  if (Math.abs(e.deltaY) < 10) return;

  e.preventDefault(); // IMPORTANTISSIMO
  if (isScrolling) return;
  isScrolling = true;

  syncIndexToViewport();

  if (e.deltaY > 0 && index < sections.length - 1) index++;
  else if (e.deltaY < 0 && index > 0) index--;

  sections[index].scrollIntoView({ behavior: "smooth" });

  setTimeout(() => (isScrolling = false), 900);
}, { passive: false });

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function(e) {
  status.textContent = "Invio in corso...";
});