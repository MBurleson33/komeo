// admin-trigger.js
// Include on every page. Type "admin" anywhere to open the admin panel.

(function () {
  // Inject the overlay HTML
  const overlay = document.createElement('div');
  overlay.id = 'adminTriggerOverlay';
  overlay.innerHTML = `
    <div id="adminTriggerBox">
      <div id="adminTriggerLogo">
        <img src="/images/Komeo_Logo_White.webp" alt="Komeo" />
      </div>
      <h2>Admin Panel</h2>
      <p>Komeo International Ministries</p>
      <input type="password" id="adminTriggerInput" placeholder="Enter password" />
      <button id="adminTriggerBtn">Sign In</button>
      <div id="adminTriggerError">Incorrect password. Please try again.</div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #adminTriggerOverlay {
      display: none;
      position: fixed;
      inset: 0;
      background: #1A2E3B;
      z-index: 99999;
      align-items: center;
      justify-content: center;
    }
    #adminTriggerOverlay.visible {
      display: flex;
    }
    #adminTriggerBox {
      background: #fff;
      border-radius: 10px;
      padding: 2.5rem;
      width: 100%;
      max-width: 380px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      font-family: 'Inter', sans-serif;
    }
    #adminTriggerLogo img {
      height: 36px;
      margin-bottom: 1.5rem;
      filter: invert(1) brightness(0.2) sepia(1) hue-rotate(170deg) saturate(3);
    }
    #adminTriggerBox h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;
      color: #1A2E3B;
      margin-bottom: 0.3rem;
    }
    #adminTriggerBox p {
      font-size: 0.85rem;
      color: #5A6E7A;
      margin-bottom: 1.75rem;
    }
    #adminTriggerInput {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 0.95rem;
      font-family: inherit;
      margin-bottom: 1rem;
      outline: none;
      box-sizing: border-box;
    }
    #adminTriggerInput:focus { border-color: #3B8DC8; }
    #adminTriggerBtn {
      width: 100%;
      padding: 0.85rem;
      background: #3B8DC8;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }
    #adminTriggerBtn:hover { background: #2A6FA0; }
    #adminTriggerError {
      color: #e53e3e;
      font-size: 0.82rem;
      margin-top: 0.75rem;
      display: none;
    }
  `;
  document.head.appendChild(style);

  // Show / hide helpers
  function show() {
    overlay.classList.add('visible');
    setTimeout(() => document.getElementById('adminTriggerInput').focus(), 50);
  }

  function hide() {
    overlay.classList.remove('visible');
    document.getElementById('adminTriggerInput').value = '';
    document.getElementById('adminTriggerError').style.display = 'none';
  }

  // Login
  async function login() {
    const pw = document.getElementById('adminTriggerInput').value;
    const errEl = document.getElementById('adminTriggerError');
    errEl.style.display = 'none';

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });

      if (res.ok) {
        sessionStorage.setItem('komeo_admin', 'authenticated');
        window.location.href = '/admin.html';
      } else {
        errEl.style.display = 'block';
      }
    } catch (e) {
      errEl.textContent = 'Network error. Please try again.';
      errEl.style.display = 'block';
    }
  }

  // Button click
  document.getElementById('adminTriggerBtn').addEventListener('click', login);

  // Enter key in input
  document.getElementById('adminTriggerInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') login();
    if (e.key === 'Escape') hide();
  });

  // Click outside box to dismiss
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide();
  });

  // Keystroke trigger — type "admin" anywhere on the page
  let keyBuffer = '';
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { hide(); return; }
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.key.length !== 1) return;
    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.length > 5) keyBuffer = keyBuffer.slice(-5);
    if (keyBuffer.includes('admin')) {
      show();
      keyBuffer = '';
    }
  });

  // Ensure page has focus for keydown events
  window.addEventListener('load', () => {
    // Only grab focus if nothing else is focused
    if (!document.activeElement || document.activeElement === document.body) {
      document.body.setAttribute('tabindex', '-1');
      document.body.focus({ preventScroll: true });
    }
  });
})();
