
const SERVICE_ID = "service_c1xsyee";
const TEMPLATE_ID = "template_b7sqe4s";
const PUBLIC_KEY = "JcVKTwZbIGExrwW6V";

const form = document.getElementById("plansForm");

emailjs.init({
    publicKey: PUBLIC_KEY
});

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = "Отправляем...";

    // Получаем выбранные занятия
    const activities = Array.from(
        document.querySelectorAll('input[name="activity"]:checked')
    ).map(item => item.value);

    // Получаем выбранную еду
    const foods = Array.from(
        document.querySelectorAll('input[name="food"]:checked')
    ).map(item => item.value);

    // Получаем дополнительные пожелания
    const otherActivity = document
        .getElementById("otherActivity").value.trim();

    const otherFood = document
        .getElementById("otherFood").value.trim();

    // Формируем текст письма
    const message = [
        "НАШИ ПЛАНЫ ❤️",
        "",
        "ЗАНЯТИЯ:",
        ...(activities.length
            ? activities.map(item => "- " + item)
            : ["Ничего не выбрано"]),
        "",
        "ДРУГИЕ ИДЕИ:",
        otherActivity || "Нет",
        "",
        "ЕДА:",
        ...(foods.length
            ? foods.map(item => "- " + item)
            : ["Ничего не выбрано"]),
        "",
        "ДРУГИЕ ИДЕИ ПО ЕДЕ:",
        otherFood || "Нет"
    ].join("\n");

    try {
        // Отправляем письмо
        await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                message: message
            }
        );

        // Показываем сообщение об успехе
        form.style.display = "none";

        document
            .getElementById("successMessage")
            .classList.remove("hidden");

    } catch (error) {
        console.error("Ошибка отправки:", error);

        alert("Не удалось отправить ответы. Попробуй ещё раз ❤️");

        button.disabled = false;
        button.textContent = "Отправить ответы ❤️";
    }
});
