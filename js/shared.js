/* ═══════════════════════════════════════════
   DESTINY PLAYGROUND — Shared JS
   Loads nav.html and footer.html into every
   page, re-executes injected scripts so that
   dropdowns, accordion & accessibility panel
   all work after injection.

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

    // innerHTML doesn't execute <script> tags — re-run them manually
    el.querySelectorAll('script').forEach(function(oldScript) {
      const newScript = document.createElement('script');
      // copy attributes (e.g. src, type)
      Array.from(oldScript.attributes).forEach(function(attr) {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      document.body.appendChild(newScript);
      oldScript.remove();
    });

  } catch (e) {
    console.warn('Could not load partial:', url, e);
  }
}

async function initShared() {
  // load nav and footer in parallel
  await Promise.all([
    loadPartial('nav-placeholder',    '/destiny-playground/nav.html'),
    loadPartial('footer-placeholder', '/destiny-playground/footer.html'),
  ]);
}

initShared();
