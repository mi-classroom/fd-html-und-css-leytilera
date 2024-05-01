document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("[data-js-menu-button]");
    const menu = document.querySelector("[data-js-menu]");
    
    button.addEventListener("click", () => {
        menu.classList.toggle("is-active");
        button.classList.toggle("is-active");
    });

    const tabNav = document.querySelectorAll("[data-js-tab-nav] li");
    tabNav.forEach((element) => {
        element.addEventListener("click", onNavTabClick);
    });
});

function onNavTabClick(event) {
    event.preventDefault();
    const currentTab = event.currentTarget;
    const tabId = currentTab.querySelector("a").getAttribute("href")
    const selectedTab = document.querySelector(tabId);

    const allNavs = document.querySelectorAll("[data-js-tab-nav] li");
    allNavs.forEach((element) => {
        element.classList.remove("selected");
    });

    const allTabs = document.querySelectorAll("[data-js-section-container]");

    allTabs.forEach((tab) => {
        tab.classList.remove("is-active");
    });

    selectedTab.classList.add("is-active");
    currentTab.classList.add("selected");
    
}