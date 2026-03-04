(() => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (!form || !statusEl) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Please fill in Name, Email, and Project Details.";
      return;
    }

    statusEl.textContent =
      "Thanks! This is a demo form — we’ll contact you within one business day.";

    form.reset();
  });
})();

