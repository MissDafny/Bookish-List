const track = document.querySelector('.carousel-track');
let slides = Array.from(document.querySelectorAll('.slide'));
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const viewport = document.querySelector('.carousel-viewport');

const visible = 5;
const center = Math.floor(visible / 2);
let index;

// 🔁 CLONAGEM PARA LOOP
const firstClones = slides.slice(0, visible).map(s => s.cloneNode(true));
const lastClones = slides.slice(-visible).map(s => s.cloneNode(true));

firstClones.forEach(clone => track.appendChild(clone));
lastClones.forEach(clone => track.insertBefore(clone, slides[0]));

slides = Array.from(document.querySelectorAll('.slide'));

const gap = 20;

function updateCarousel(animate = true) {
  const slideWidth = slides[0].offsetWidth + gap;
  const viewportCenter = viewport.offsetWidth / 2;
  const slideCenter = slideWidth / 2;

  track.style.transition = animate ? 'transform 0.5s ease' : 'none';

  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');

  const offset =
    index * slideWidth - viewportCenter + slideCenter;

  track.style.transform = `translateX(-${offset}px)`;
}

// 👉 posição inicial correta
index = visible + center;
updateCarousel(false);

// 👉 BOTÕES
next.addEventListener('click', () => {
  index++;
  updateCarousel();

  if (index >= slides.length - visible) {
    setTimeout(() => {
      index = visible + center;
      updateCarousel(false);
    }, 500);
  }
});

prev.addEventListener('click', () => {
  index--;
  updateCarousel();

  if (index < center) {
    setTimeout(() => {
      index = slides.length - visible - center - 1;
      updateCarousel(false);
    }, 500);
  }
});


// 🖱️ CLIQUE EM QUALQUER CAPA → VIRA CENTRO
slides.forEach((slide, i) => {
  slide.style.pointerEvents = 'auto';

  slide.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});
