(function () {
  const isSubpage = window.location.pathname.includes('/pages/');
  const base = isSubpage ? '../' : '';

  const routes = {
    home: base + 'index.html',
    services: base + 'pages/services.html',
    industries: base + 'pages/industries.html',
    about: base + 'pages/about.html',
    contact: base + 'pages/contact.html'
  };

  function getCurrentPage() {
    if (document.body.dataset.page) return document.body.dataset.page;
    const path = window.location.pathname;
    if (path.includes('services')) return 'services';
    if (path.includes('industries')) return 'industries';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    return 'home';
  }

  function wireRoutes() {
    const currentPage = getCurrentPage();

    document.querySelectorAll('[data-route]').forEach(el => {
      const target = el.getAttribute('data-route');
      if (routes[target]) {
        el.setAttribute('href', routes[target]);
      }
      if (el.classList.contains('tab')) {
        el.classList.toggle('on', target === currentPage);
      }
    });
  }

  window.wireRoutes = wireRoutes;

  async function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);
    if (!container) return;
    try {
      const res = await fetch(base + filePath);
      if (res.ok) {
        container.innerHTML = await res.text();
      }
    } catch (err) {
      console.error('Could not load component:', filePath, err);
    }
  }

  async function initLayout() {
    await Promise.all([
      loadComponent('site-header', 'components/header.html'),
      loadComponent('site-footer', 'components/footer.html'),
      loadComponent('site-cta', 'components/cta-banner.html')
    ]);
    wireRoutes();
  }

  document.addEventListener('DOMContentLoaded', initLayout);
})();
