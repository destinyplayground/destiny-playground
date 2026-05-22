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

  // Scroll to top after partials have injected and layout has settled
  // This prevents the browser's scroll restore from landing mid-page
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

initShared();
