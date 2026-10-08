
// УКАЖИ СВОЙ WHATSAPP
// Например: 992921234567
const whatsappNumber = "992926483100";

const modal = document.getElementById("orderModal");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const nav = document.getElementById("nav");

// ОТКРЫТИЕ ФОРМЫ
function openOrder(model = "") {
    document.getElementById("selectedModel").value = model;
    modal.classList.add("show");
    document.body.classList.add("no-scroll");
}

// ЗАКРЫТИЕ ФОРМЫ
function closeOrder() {
    modal.classList.remove("show");
    document.body.classList.remove("no-scroll");
}

document.querySelectorAll(".open-order").forEach(button => {
    button.addEventListener("click", () => openOrder());
});

// КНОПКА "ХОЧУ ПОХОЖИЙ"
document.querySelectorAll(".choose-btn").forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".product");
        openOrder(card.dataset.name);
    });
});

document.getElementById("closeModal").addEventListener("click", closeOrder);

modal.addEventListener("click", event => {
    if (event.target === modal) closeOrder();
});

// ФИЛЬТРАЦИЯ ДИВАНОВ И ПУФИКОВ
const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".product");

filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.filter;

        products.forEach(product => {
            const show = category === "all" ||
                         product.dataset.category === category;

            product.classList.toggle("hidden", !show);
        });
    });
});

// УВЕЛИЧЕНИЕ ФОТО
document.querySelectorAll(".zoom-btn").forEach(button => {
    button.addEventListener("click", () => {
        const image = button.parentElement.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("show");
        document.body.classList.add("no-scroll");
    });
});

function closePhoto() {
    lightbox.classList.remove("show");
    lightboxImage.removeAttribute("src");
    document.body.classList.remove("no-scroll");
}

document.getElementById("closeLightbox").addEventListener("click", closePhoto);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closePhoto();
});

// ESC — ЗАКРЫТЬ ОКНО
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (lightbox.classList.contains("show")) {
            closePhoto();
        } else if (modal.classList.contains("show")) {
            closeOrder();
        }
    }
});

// МОБИЛЬНОЕ МЕНЮ
document.getElementById("menuBtn").addEventListener("click", () => {
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

// АНИМАЦИИ
// Элементы остаются видимыми даже без JavaScript.
// Класс добавляется только если есть элементы .reveal.

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    revealElements.forEach(element => observer.observe(element));
    document.body.classList.add("js-ready");
}

// ИМЯ ЗАГРУЖЕННОГО ФАЙЛА
const photoInput = document.getElementById("referencePhoto");

photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    document.getElementById("fileName").textContent =
        file ? file.name : "JPG, PNG или WEBP";
});

// ОТПРАВКА ЗАЯВКИ В WHATSAPP
document.getElementById("orderForm").addEventListener("submit", event => {
    event.preventDefault();

    const value = id => document.getElementById(id).value.trim();

    const name = value("clientName");
    const phone = value("clientPhone");
    const type = value("furnitureType");
    const model = value("selectedModel");
    const length = value("length");
    const width = value("width");
    const height = value("height");
    const fabric = value("fabric");
    const comment = value("comment");

    const dimensions = [
        length ? `Длина: ${length} см` : "",
        width ? `Ширина: ${width} см` : "",
        height ? `Высота: ${height} см` : ""
    ].filter(Boolean).join(", ");

    const lines = [
        "Здравствуйте! Хочу заказать мягкую мебель.",
        "",
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Тип мебели: ${type}`,
        model ? `Модель: ${model}` : "",
        dimensions ? `Размеры: ${dimensions}` : "",
        fabric ? `Ткань и цвет: ${fabric}` : "",
        comment ? `Пожелания: ${comment}` : "",
        photoInput.files.length
            ? "Фотографию прикреплю отдельным сообщением."
            : ""
    ].filter(line => line !== "");

    const message = encodeURIComponent(lines.join("\n"));

    window.open(
        `https://wa.me/${whatsappNumber}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
    );
});

// WHATSAPP В ПОДВАЛЕ
document.getElementById("footerWhatsapp").addEventListener("click", event => {
    event.preventDefault();


    window.open(
        `https://wa.me/${whatsappNumber}`,
        "_blank",
        "noopener,noreferrer"
    );
});
