(function () {
  const source = window.AUTOBAN_SITE;
  const draftKey = "autoban.products.draft";
  const state = {
    products: JSON.parse(localStorage.getItem(draftKey) || "null") || source.products.slice()
  };

  const save = () => localStorage.setItem(draftKey, JSON.stringify(state.products));

  const serializeProducts = () => JSON.stringify(state.products, null, 2);

  const exportText = () => {
    const clone = { ...source, products: state.products };
    return `window.AUTOBAN_SITE = ${JSON.stringify(clone, null, 2)};\n`;
  };

  const render = () => {
    document.querySelector("[data-admin-count]").textContent = state.products.length;
    const list = document.querySelector("[data-admin-products]");
    list.innerHTML = state.products
      .map(
        (item) => `
          <article class="admin-product">
            <div>
              <strong>${item.title}</strong>
              <span>${item.category} · ${item.stock || "статус не указан"}</span>
              <code>${item.image || "фото не указано"}</code>
            </div>
            <button type="button" data-delete="${item.id}" aria-label="Удалить">×</button>
          </article>
        `
      )
      .join("");

    list.querySelectorAll("[data-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        state.products = state.products.filter((item) => item.id !== button.dataset.delete);
        save();
        render();
      });
    });

    document.querySelector("[data-export-output]").value = exportText();
  };

  const productFromForm = (form) => {
    const data = new FormData(form);
    const field = (name) => String(data.get(name) || "").trim();
    const split = (name) =>
      field(name)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    return {
      id: field("id"),
      title: field("title"),
      category: field("category"),
      description: field("description"),
      price: field("price") || "по запросу",
      stock: field("stock") || "Уточнить наличие",
      delivery: field("delivery") || "по согласованию",
      tags: split("tags"),
      brands: split("brands"),
      priority: state.products.length + 1,
      image: field("image") || "assets/catalog/new/product.webp",
      fallback:
        field("fallback") ||
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80"
    };
  };

  const download = () => {
    const blob = new Blob([exportText()], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "catalog-export.js";
    link.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    const output = document.querySelector("[data-export-output]");
    output.select();
    try {
      await navigator.clipboard.writeText(output.value);
    } catch (error) {
      document.execCommand("copy");
    }
  };

  const bind = () => {
    document.getElementById("productEditor").addEventListener("submit", (event) => {
      event.preventDefault();
      const product = productFromForm(event.currentTarget);
      state.products = state.products.filter((item) => item.id !== product.id).concat(product);
      save();
      event.currentTarget.reset();
      render();
    });

    document.querySelector("[data-reset-draft]").addEventListener("click", () => {
      localStorage.removeItem(draftKey);
      state.products = source.products.slice();
      render();
    });

    document.querySelector("[data-copy-export]").addEventListener("click", copy);
    document.querySelector("[data-download-export]").addEventListener("click", download);
    document.querySelector("[data-export-top]").addEventListener("click", () => {
      document.getElementById("export").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    document.querySelector("[data-download-export]").addEventListener("dblclick", download);
  };

  document.addEventListener("DOMContentLoaded", () => {
    render();
    bind();
  });
})();
