const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const contactForms = document.querySelectorAll(".contact-form");
const benefitCards = document.querySelectorAll(".benefit-card");
const recipient = "Lucasspindler44@gmail.com";

const value = (data, key) => (data.get(key) || "").toString().trim() || "-";

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

benefitCards.forEach((card) => {
  card.addEventListener("click", () => {
    benefitCards.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-expanded", "false");
    });

    card.classList.add("is-active");
    card.setAttribute("aria-expanded", "true");
  });
});

const buildBoardingMail = (data) => ({
  subject: "Anfrage Einstellplatz - BCR Beaver Creek Ranch",
  body: [
    "Hallo BCR Beaver Creek Ranch,",
    "",
    "ich interessiere mich für einen freien Einstellplatz.",
    "",
    "KONTAKTDATEN",
    `Name: ${value(data, "name")}`,
    `Telefon: ${value(data, "phone")}`,
    `E-Mail: ${value(data, "email")}`,
    "",
    "ANFRAGE",
    `Was wird gesucht: ${value(data, "request")}`,
    `Gewünschter Starttermin: ${value(data, "start")}`,
    `Aktueller Standort des Pferdes: ${value(data, "location")}`,
    "",
    "PFERD",
    value(data, "horse"),
    "",
    "WEITERE INFOS",
    value(data, "message"),
    "",
    "Viele Grüße",
    value(data, "name"),
  ].join("\n"),
});

const buildVisitMail = (data) => ({
  subject: "Besichtigung vereinbaren - BCR Beaver Creek Ranch",
  body: [
    "Hallo BCR Beaver Creek Ranch,",
    "",
    "ich möchte gerne eine Besichtigung vereinbaren.",
    "",
    "KONTAKTDATEN",
    `Name: ${value(data, "name")}`,
    `Telefon: ${value(data, "phone")}`,
    `E-Mail: ${value(data, "email")}`,
    "",
    "TERMINWUNSCH",
    `Wunschtermin / Zeitraum: ${value(data, "preferredDate")}`,
    `Gut erreichbar: ${value(data, "availability")}`,
    "",
    "INTERESSE",
    `Worum geht es: ${value(data, "interest")}`,
    "",
    "KURZE INFO VORAB",
    value(data, "message"),
    "",
    "Viele Grüße",
    value(data, "name"),
  ].join("\n"),
});

contactForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const mail = form.dataset.formType === "visit" ? buildVisitMail(data) : buildBoardingMail(data);
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`;
    window.location.href = mailto;

    const statusEl = form.querySelector(".form-status");
    if (statusEl) {
      statusEl.textContent = "Dein E-Mail-Programm wird geöffnet. Falls nichts passiert, schreib uns direkt an Lucasspindler44@gmail.com.";
    }
  });
});
