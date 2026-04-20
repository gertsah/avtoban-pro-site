(function () {
  const data = window.AUTOBAN_SITE;
  const state = {
    activeSlide: 0,
    category: "Все",
    brand: "",
    query: "",
    sort: "priority",
    request: []
  };

  const fallbackImage = (img) => {
    if (!img || img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = "true";
    img.src = img.dataset.fallback;
  };

  const normalize = (value) => String(value || "").toLowerCase().trim();

  const formatPhoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

  const whatsappUrl = (message) => {
    const phone = data.business.whatsapp;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const renderHero = () => {
    const track = document.getElementById("heroTrack");
    const dots = document.getElementById("heroDots");
    track.innerHTML = "";
    dots.innerHTML = "";

    data.heroSlides.forEach((slide, index) => {
      const figure = document.createElement("figure");
      figure.className = `hero-slide ${index === state.activeSlide ? "is-active" : ""}`;
      figure.setAttribute("aria-hidden", index === state.activeSlide ? "false" : "true");
      figure.innerHTML = `
        <img src="${slide.image}" data-fallback="${slide.fallback}" alt="${slide.title}" />
        <figcaption>${slide.note}</figcaption>
      `;
      figure.querySelector("img").addEventListener("error", (event) => fallbackImage(event.target));
      track.appendChild(figure);

      const dot = document.createElement("button");
      dot.className = `hero-dot ${index === state.activeSlide ? "is-active" : ""}`;
      dot.type = "button";
      dot.setAttribute("aria-label", `Показать слайд ${index + 1}`);
      dot.addEventListener("click", () => {
        state.activeSlide = index;
        renderHero();
      });
      dots.appendChild(dot);
    });
  };

  const nextHero = (step) => {
    const max = data.heroSlides.length;
    state.activeSlide = (state.activeSlide + step + max) % max;
    renderHero();
  };

  const categories = () => ["Все", ...new Set(data.products.map((item) => item.category))];

  const renderQuickCategories = () => {
    const container = document.getElementById("quickCategories");
    container.innerHTML = categories()
      .slice(1)
      .map((category) => `<a href="#catalog" data-jump-category="${category}">${category}</a>`)
      .join("");
  };

  const renderFilters = () => {
    const container = document.getElementById("categoryFilters");
    container.innerHTML = "";
    categories().forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `chip ${state.category === category ? "is-active" : ""}`;
      button.textContent = category;
      button.addEventListener("click", () => {
        state.category = category;
        renderCatalog();
        renderFilters();
      });
      container.appendChild(button);
    });

    const brands = document.getElementById("brandCloud");
    brands.innerHTML = "";
    data.brands.slice(0, 16).forEach((brand) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `brand-pill ${state.brand === brand ? "is-active" : ""}`;
      button.textContent = brand;
      button.addEventListener("click", () => {
        state.brand = state.brand === brand ? "" : brand;
        renderCatalog();
        renderFilters();
      });
      brands.appendChild(button);
    });
  };

  const productMatches = (product) => {
    const query = normalize(state.query);
    const text = normalize(
      [
        product.title,
        product.category,
        product.description,
        product.stock,
        product.tags.join(" "),
        product.brands.join(" ")
      ].join(" ")
    );

    const categoryMatch = state.category === "Все" || product.category === state.category;
    const brandMatch = !state.brand || product.brands.includes(state.brand);
    const queryMatch = !query || text.includes(query);
    return categoryMatch && brandMatch && queryMatch;
  };

  const sortedProducts = () => {
    const products = data.products.filter(productMatches);
    return products.sort((a, b) => {
      if (state.sort === "name") return a.title.localeCompare(b.title, "ru");
      if (state.sort === "stock") return Number(b.stock.includes("налич")) - Number(a.stock.includes("налич"));
      return a.priority - b.priority;
    });
  };

  const renderCatalog = () => {
    const grid = document.getElementById("productGrid");
    const template = document.getElementById("productTemplate");
    const products = sortedProducts();
    grid.innerHTML = "";
    document.querySelector("[data-catalog-count]").textContent = products.length;

    products.forEach((product) => {
      const node = template.content.cloneNode(true);
      const card = node.querySelector(".product-card");
      const imageButton = node.querySelector("[data-open-product]");
      const img = node.querySelector("img");
      const badge = node.querySelector(".stock-badge");
      const title = node.querySelector("h3");
      const category = node.querySelector(".product-card__category");
      const text = node.querySelector(".product-card__text");
      const price = node.querySelector(".price-label");
      const tags = node.querySelector(".tag-row");
      const add = node.querySelector("[data-add-request]");

      card.dataset.productId = product.id;
      img.src = product.image;
      img.dataset.fallback = product.fallback;
      img.alt = product.title;
      img.addEventListener("error", (event) => fallbackImage(event.target));
      badge.textContent = product.stock;
      category.textContent = product.category;
      title.textContent = product.title;
      text.textContent = product.description;
      price.textContent = product.price;
      tags.innerHTML = product.tags.map((tag) => `<span>${tag}</span>`).join("");

      imageButton.addEventListener("click", () => openProduct(product));
      title.addEventListener("click", () => openProduct(product));
      add.addEventListener("click", () => addToRequest(product));

      grid.appendChild(node);
    });

    refreshRevealTargets();
  };

  const renderFlow = () => {
    const container = document.getElementById("flowSteps");
    container.innerHTML = data.flow
      .map(
        (step, index) => `
          <article class="flow-step reveal" style="--step-index:${index}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${step.title}</h3>
            <p>${step.text}</p>
          </article>
        `
      )
      .join("");
  };

  const renderServices = () => {
    const container = document.getElementById("serviceGrid");
    container.innerHTML = data.services
      .map(
        (service) => `
          <article class="service-card reveal">
            <h3>${service.title}</h3>
            <p>${service.text}</p>
          </article>
        `
      )
      .join("");
  };

  const renderGallery = () => {
    const container = document.getElementById("galleryCards");
    container.innerHTML = "";
    data.photoTemplates.forEach((photo) => {
      const card = document.createElement("article");
      card.className = "gallery-card reveal";
      card.innerHTML = `
        <img src="${photo.image}" data-fallback="${photo.fallback}" alt="${photo.title}" loading="lazy" />
        <div>
          <h3>${photo.title}</h3>
          <p>${photo.caption}</p>
          <code>${photo.path}</code>
        </div>
      `;
      card.querySelector("img").addEventListener("error", (event) => fallbackImage(event.target));
      container.appendChild(card);
    });
  };

  const renderReviews = () => {
    const container = document.getElementById("reviewGrid");
    container.innerHTML = data.reviews
      .map(
        (review) => `
          <article class="review-card reveal">
            <p>${review.text}</p>
            <strong>${review.name}</strong>
          </article>
        `
      )
      .join("");
  };

  const renderContacts = () => {
    const container = document.getElementById("contactList");
    const phoneLinks = data.business.phones
      .map((phone) => `<a href="${formatPhoneHref(phone)}">${phone}</a>`)
      .join("");
    const hours = data.business.workHours
      .map((item) => `<span>${item.days}: ${item.time}</span>`)
      .join("");
    const payments = data.business.payments.map((item) => `<span>${item}</span>`).join("");
    const features = data.business.features.map((item) => `<span>${item}</span>`).join("");

    container.innerHTML = `
      <div><span>Адрес</span><strong>${data.business.address}</strong></div>
      <div><span>Телефоны</span><strong>${phoneLinks}</strong></div>
      <div><span>Почта</span><strong><a href="mailto:${data.business.email}">${data.business.email}</a></strong></div>
      <div><span>График</span><strong>${hours}</strong></div>
      <div><span>Оплата</span><strong>${payments}</strong></div>
      <div><span>Условия</span><strong>${features}</strong></div>
    `;
  };

  const updateOpenStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const weekday = day >= 1 && day <= 5;
    const start = weekday ? 9 * 60 : 10 * 60;
    const end = weekday ? 18 * 60 : 15 * 60;
    const status = minutes >= start && minutes < end ? "Открыто сейчас" : "Закрыто, можно написать";
    document.querySelector("[data-open-status]").textContent = status;
  };

  const openProduct = (product) => {
    const dialog = document.getElementById("productDialog");
    const content = document.getElementById("dialogContent");
    content.innerHTML = `
      <div class="dialog-grid">
        <img src="${product.image}" data-fallback="${product.fallback}" alt="${product.title}" />
        <div>
          <p class="eyebrow">${product.category}</p>
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <dl class="product-facts">
            <div><dt>Цена</dt><dd>${product.price}</dd></div>
            <div><dt>Статус</dt><dd>${product.stock}</dd></div>
            <div><dt>Срок</dt><dd>${product.delivery}</dd></div>
            <div><dt>Бренды</dt><dd>${product.brands.join(", ")}</dd></div>
          </dl>
          <button class="button button--accent" type="button" data-dialog-add>Добавить в заявку</button>
        </div>
      </div>
    `;
    content.querySelector("img").addEventListener("error", (event) => fallbackImage(event.target));
    content.querySelector("[data-dialog-add]").addEventListener("click", () => addToRequest(product));
    dialog.showModal();
  };

  const addToRequest = (product) => {
    if (!state.request.find((item) => item.id === product.id)) {
      state.request.push(product);
    }
    updateRequest();
    openRequest();
  };

  const removeFromRequest = (productId) => {
    state.request = state.request.filter((item) => item.id !== productId);
    updateRequest();
  };

  const updateRequest = () => {
    document.querySelector("[data-request-count]").textContent = state.request.length;
    const container = document.querySelector("[data-request-items]");
    if (!state.request.length) {
      container.innerHTML = `<p class="empty-state">Пока нет позиций. Добавьте товар из каталога.</p>`;
      return;
    }
    container.innerHTML = state.request
      .map(
        (item) => `
          <div class="request-item">
            <strong>${item.title}</strong>
            <span>${item.category}</span>
            <button type="button" data-remove-request="${item.id}" aria-label="Удалить">×</button>
          </div>
        `
      )
      .join("");
    container.querySelectorAll("[data-remove-request]").forEach((button) => {
      button.addEventListener("click", () => removeFromRequest(button.dataset.removeRequest));
    });
  };

  const openRequest = () => {
    const drawer = document.querySelector("[data-request-drawer]");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
  };

  const closeRequest = () => {
    const drawer = document.querySelector("[data-request-drawer]");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  };

  const submitVin = (event) => {
    event.preventDefault();
    const input = document.getElementById("vinInput");
    const value = input.value.trim();
    const message = value
      ? `Здравствуйте! Нужен подбор запчастей. Данные: ${value}`
      : "Здравствуйте! Нужен подбор запчастей.";
    window.open(whatsappUrl(message), "_blank", "noopener");
  };

  const submitRequest = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const items = state.request.length
      ? state.request.map((item) => `- ${item.title} (${item.category})`).join("\n")
      : "- Нужен подбор по описанию";
    const message = [
      "Здравствуйте! Хочу уточнить запчасти:",
      items,
      `Имя: ${form.get("name") || ""}`,
      `Телефон: ${form.get("phone") || ""}`,
      `Авто/VIN: ${form.get("car") || ""}`
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener");
  };

  let revealObserver;
  const refreshRevealTargets = () => {
    if (!revealObserver) return;
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((node) => revealObserver.observe(node));
  };

  const initReveal = () => {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    refreshRevealTargets();
  };

  const bindEvents = () => {
    document.querySelector("[data-hero-prev]").addEventListener("click", () => nextHero(-1));
    document.querySelector("[data-hero-next]").addEventListener("click", () => nextHero(1));
    document.getElementById("vinForm").addEventListener("submit", submitVin);
    document.getElementById("catalogSearch").addEventListener("input", (event) => {
      state.query = event.target.value;
      renderCatalog();
    });
    document.getElementById("catalogSort").addEventListener("change", (event) => {
      state.sort = event.target.value;
      renderCatalog();
    });
    document.querySelector("[data-open-request]").addEventListener("click", openRequest);
    document.querySelector("[data-close-request]").addEventListener("click", closeRequest);
    document.getElementById("requestForm").addEventListener("submit", submitRequest);
    document.querySelector("[data-close-dialog]").addEventListener("click", () => {
      document.getElementById("productDialog").close();
    });
    document.querySelector("[data-request-drawer]").addEventListener("click", (event) => {
      if (event.target.matches("[data-request-drawer]")) closeRequest();
    });
    document.addEventListener("click", (event) => {
      const jump = event.target.closest("[data-jump-category]");
      if (!jump) return;
      state.category = jump.dataset.jumpCategory;
      renderFilters();
      renderCatalog();
    });
    window.addEventListener("scroll", () => {
      document.querySelector("[data-header]").classList.toggle("is-scrolled", window.scrollY > 20);
    });
  };

  const init = () => {
    renderHero();
    renderQuickCategories();
    renderFilters();
    renderCatalog();
    renderFlow();
    renderServices();
    renderGallery();
    renderReviews();
    renderContacts();
    updateRequest();
    updateOpenStatus();
    initReveal();
    bindEvents();
    setInterval(() => nextHero(1), 7000);
  };

  document.addEventListener("DOMContentLoaded", init);
})();
