const button = document.querySelector("[data-js-menu-button]");
const menu = document.querySelector("[data-js-menu]");

button.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    button.classList.toggle("is-active");
});