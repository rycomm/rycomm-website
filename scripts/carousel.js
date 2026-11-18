function scrollCarousel(direction) {
  const carousel = document.getElementById('tech-carousel');
  if (!carousel) return;
  const scrollAmount = (carousel.clientWidth / 4) + 24;
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', async function () {
  const carousel = document.getElementById('tech-carousel');
  if (!carousel) return;

  try {
    const res = await fetch('data/carousel-items.json');
    if (!res.ok) return;
    const items = await res.json();

    carousel.innerHTML = items.map(item => `
      <a href="pages/services.html" data-route="services" class="tech-card text-left bg-white border border-slate-200 overflow-hidden group flex flex-col flex-none w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start">
        <div class="aspect-[4/3] overflow-hidden relative w-full">
          <div class="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
          <img src="${item.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" alt="${item.title}">
        </div>
        <div class="p-6 flex-grow w-full">
          <h4 class="text-lg font-bold text-primary mb-2">${item.title}</h4>
          <p class="text-sm text-slate-600">${item.description}</p>
        </div>
      </a>
    `).join('');

    if (typeof window.wireRoutes === 'function') {
      window.wireRoutes();
    }
  } catch (err) {
    console.error('Could not load carousel items:', err);
  }
});
