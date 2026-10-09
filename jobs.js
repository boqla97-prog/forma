
const whatsappNumber = "992926483100";

// МОБИЛЬНОЕ МЕНЮ
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".header nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

// ВЫБОР ВАКАНСИИ
document.querySelectorAll(".job-button").forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("position").value = button.dataset.job;
        document.getElementById("application").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// АНИМАЦИИ ПРИ ПРОКРУТКЕ
const elements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    elements.forEach(element => observer.observe(element));
} else {
    elements.forEach(element => element.classList.add("visible"));
}

// ОТПРАВКА АНКЕТЫ В WHATSAPP
document.getElementById("jobForm").addEventListener("submit", event => {
    event.preventDefault();

    const get = id => document.getElementById(id).value.trim();

    const name = get("fullName");
    const phone = get("phone");
    const age = get("age");
    const experience = get("experience");
    const position = get("position");
    const about = get("about");

    const message = [
        "Здравствуйте! Хочу устроиться на работу в FORMA.",
        "",
        "ФИО: " + name,
        "Телефон: " + phone,
        "Возраст: " + age,
        "Вакансия: " + position,
        "Опыт работы: " + experience,
        about ? "О себе: " + about : ""
    ].filter(Boolean).join("\n");

    const url = "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
});
