(function () {
  const config = window.TRADE_CONFIG || {};
  document.documentElement.style.setProperty("--accent", config.accent || "#dfff00");

  const pages = [
    ["Home", "index.html"],
    ["Services", "services.html"],
    ["Residential", "residential.html"],
    ["Commercial", "commercial.html"],
    ["Projects", "projects.html"],
    ["Credentials", "credentials.html"],
    ["Service areas", "service-areas.html"],
    ["FAQ", "faq.html"],
    ["Contact", "contact.html"]
  ];

  const header = document.querySelector("[data-site-header]");
  if (header) {
    const current = document.body.dataset.page || "Home";
    header.innerHTML = `
      <a class="skip-link" href="#main">Skip to main content</a>
      <div class="utility-bar">
        <span>WEBSITE SYSTEM PREVIEW</span>
        <span class="utility-region" data-bind="countryMode"></span>
        <span class="utility-hours" data-bind="businessHours"></span>
      </div>
      <div class="nav-shell">
        <a class="wordmark" href="index.html" aria-label="${config.businessName || "Fieldline Electric"} home">
          <span>${config.wordmarkPrimary || "FIELDLINE"}</span>
          <small>${config.wordmarkSecondary || "ELECTRIC"}</small>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span>Menu</span><span class="menu-lines" aria-hidden="true"></span>
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
          ${pages.map(([label, href]) => `<a href="${href}"${label === current ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <a class="nav-call" href="tel:${config.phoneHref}">Call now <span aria-hidden="true">↗</span></a>
      </div>`;
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <section class="footer-cta" aria-labelledby="footer-cta-title">
        <p class="eyebrow eyebrow-dark">Start with the real problem</p>
        <h2 id="footer-cta-title">Tell us what is happening.<br>We’ll help define the next step.</h2>
        <div class="button-row">
          <a class="button button-accent" href="tel:${config.phoneHref}">Call now</a>
          <a class="button button-outline-light" href="contact.html#quote">Request a quote</a>
        </div>
      </section>
      <div class="footer-grid">
        <div>
          <a class="wordmark wordmark-footer" href="index.html"><span>${config.wordmarkPrimary || "FIELDLINE"}</span><small>${config.wordmarkSecondary || "ELECTRIC"}</small></a>
          <p class="footer-note">A conversion-ready website system for a credentialed local trade. Replace all pending facts before public launch.</p>
        </div>
        <div>
          <h3>Navigate</h3>
          ${pages.slice(1).map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
        </div>
        <div>
          <h3>Contact</h3>
          <a href="tel:${config.phoneHref}" data-bind="phoneDisplay"></a>
          <a href="mailto:${config.email}" data-bind="email"></a>
          <span data-bind="serviceAreaSummary"></span>
          <span data-bind="businessHours"></span>
        </div>
        <div>
          <h3>Trust</h3>
          <a href="credentials.html">Licence & insurance</a>
          <a href="privacy.html">Privacy</a>
          <a href="faq.html">Customer FAQ</a>
          <span>© <span data-current-year></span> <span data-bind="businessName"></span></span>
        </div>
      </div>`;
  }

  document.querySelectorAll("[data-bind]").forEach((node) => {
    const key = node.dataset.bind;
    if (config[key]) node.textContent = config[key];
  });
  document.querySelectorAll("[data-phone-link]").forEach((node) => { node.href = `tel:${config.phoneHref}`; });
  document.querySelectorAll("[data-email-link]").forEach((node) => { node.href = `mailto:${config.email}`; });
  document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
  }

  document.querySelectorAll("details.faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll("details.faq-item[open]").forEach((other) => {
        if (other !== item) other.removeAttribute("open");
      });
    });
  });

  document.querySelectorAll("form[data-quote-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = "Please complete the required fields above.";
        return;
      }
      if (status) {
        status.textContent = "Preview complete. Your details were checked on this device but were not sent or stored. Call to speak with a person, or connect an approved lead service before launch.";
        status.focus();
      }
    });
  });

  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll("[data-reveal]").forEach((el) => observer ? observer.observe(el) : el.classList.add("is-visible"));

  if (config.schemaEnabled) {
    const required = ["businessName", "phoneHref", "serviceAreaSummary", "canonicalOrigin"];
    const ready = required.every((key) => config[key] && !/ADD|PLACEHOLDER|example/i.test(config[key]));
    if (ready) {
      const schema = {
        "@context": "https://schema.org",
        "@type": config.schemaType || "LocalBusiness",
        name: config.businessName,
        telephone: config.phoneHref,
        email: config.email,
        url: config.canonicalOrigin,
        areaServed: config.serviceAreaSummary,
        description: "Local electrical assessment, repair, upgrade and installation services for residential and commercial properties."
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }
})();
