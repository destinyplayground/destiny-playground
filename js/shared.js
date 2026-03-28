/* ═══════════════════════════════════════════
   DESTINY PLAYGROUND — Shared JS
   Loads nav.html and footer.html into every
   page, and handles the mobile menu toggle.

   HOW TO USE:
   Add these two placeholder elements to your page:
     <div id="nav-placeholder"></div>
     <div id="footer-placeholder"></div>

   Then include this script at the bottom of <body>:
     <script src="/destiny-playground/js/shared.js"></script>
   ═══════════════════════════════════════════ */

async function loadPartial(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + url);
    el.innerHTML = await res.text();
  } catch (e) {
    console.warn('Could not load partial:', url, e);
  }
}

async function initShared() {
  await Promise.all([
    loadPartial('nav-placeholder',    '/destiny-playground/nav.html'),
    loadPartial('footer-placeholder', '/destiny-playground/footer.html'),
  ]);

  // Mobile menu toggle — wired up after nav is injected
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

  // Highlight current page in nav
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.style.color = 'var(--gold)';
    }
  });
}

initShared();
