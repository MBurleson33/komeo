/* ============================================
   KOMEO INTERNATIONAL MINISTRIES
   Shared Nav + Footer — komeo.js
   Injects nav and footer, handles all nav behavior
   ============================================ */

(function () {

  // ── INJECT NAV ──
  const navHTML = `
    <nav id="mainNav">
      <a href="/index.html" class="nav-logo">
        <img src="/images/Komeo_Logo_White.webp" alt="Komeo International Ministries" />
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="navLinks">
        <li><a href="/index.html">Home</a></li>
        <li class="nav-dropdown">
          <a href="#" onclick="return false;">About</a>
          <div class="dropdown-menu">
            <a href="/our-beginnings.html">Our Beginnings</a>
            <a href="/meet-the-team.html">Meet the Team</a>
            <a href="/our-beliefs.html">Our Beliefs</a>
          </div>
        </li>
        <li><a href="/sponsor.html">Sponsor</a></li>
        <li class="nav-dropdown">
          <a href="#" onclick="return false;">Get Involved</a>
          <div class="dropdown-menu">
            <a href="/sponsor.html">Sponsorship</a>
            <a href="/mission-teams.html">Mission Teams</a>
            <a href="/missionary-support.html">Missionary Support</a>
            <a href="/outreach-efforts.html">Outreach Efforts</a>
            <a href="/other-opportunities.html">Other Opportunities</a>
          </div>
        </li>
        <li><a href="/building-project.html">Building Project</a></li>
        <li><a href="/stories.html">Stories</a></li>
        <li><a href="/donor-portal.html">Donor Portal</a></li>
        <li><a href="/give.html" class="nav-give">Give</a></li>
      </ul>
    </nav>
  `;

  // ── INJECT FOOTER ──
  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="/images/Komeo_Logo_White.webp" alt="Komeo International Ministries" />
            <p>Sharing the Gospel and demonstrating God's love by caring for orphans in Sierra Leone, West Africa since 2010.</p>
            <div class="footer-social">
              <a href="https://www.facebook.com/KomeoInternational" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/komeoministries/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h5>About</h5>
            <ul>
              <li><a href="/our-beginnings.html">Our Beginnings</a></li>
              <li><a href="/meet-the-team.html">Meet the Team</a></li>
              <li><a href="/our-beliefs.html">Our Beliefs</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Get Involved</h5>
            <ul>
              <li><a href="/sponsor.html">Sponsor a Child</a></li>
              <li><a href="/mission-teams.html">Mission Teams</a></li>
              <li><a href="/missionary-support.html">Missionary Support</a></li>
              <li><a href="/outreach-efforts.html">Outreach Efforts</a></li>
              <li><a href="/other-opportunities.html">Other Opportunities</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>More</h5>
            <ul>
              <li><a href="/building-project.html">Building Project</a></li>
              <li><a href="/stories.html">Stories</a></li>
              <li><a href="/donor-portal.html">Donor Portal</a></li>
              <li><a href="/give.html">Give</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Komeo International Ministries. All rights reserved.</p>
          <div class="footer-contact">
            P.O. Box 21586, Oklahoma City, OK 73156<br>
            <a href="tel:4056596802">405-659-6802</a> &nbsp;·&nbsp;
            <a href="mailto:info@komeo.org">info@komeo.org</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  document.addEventListener('DOMContentLoaded', function () {

    // Inject nav at top of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Inject footer before closing body
    // Find existing <footer> and replace, or append
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
      existingFooter.outerHTML = footerHTML;
    } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // ── HIGHLIGHT ACTIVE NAV LINK ──
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href').replace('/', '');
      if (href === path || (path === '' && href === 'index.html')) {
        a.style.color = '#fff';
        a.style.fontWeight = '600';
      }
    });

    // ── NAV SCROLL EFFECT ──
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── MOBILE TOGGLE ──
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg);';
        spans[1].style.cssText = 'opacity: 0; transform: scaleX(0);';
        spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg);';
      } else {
        spans.forEach(s => s.style.cssText = '');
      }
    });

    // ── MOBILE DROPDOWN TOGGLES ──
    document.querySelectorAll('.nav-dropdown > a').forEach(a => {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          this.closest('.nav-dropdown').classList.toggle('open');
        }
      });
    });

    // Close mobile menu when a non-dropdown link is clicked
    document.querySelectorAll('.nav-links > li:not(.nav-dropdown) > a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
      });
    });

  });

})();
