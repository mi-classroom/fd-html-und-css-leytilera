const articleListUrl = "https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/38c62965139a156d4a605be1e046ad8278235fff/articles.json";
let currentData = null;

document.addEventListener("DOMContentLoaded", () => {
    initArticleList();   
});

function initArticleList() {
    fetch(articleListUrl).then((res) => {
        res.json().then((json) => {
            currentData = json;
            renderArticleList(currentData.articles);
            renderFilterButtons();
            initFilters();
        });
    });
}

function initFilters() {

//     const buttonElements = document.querySelectorAll('[data-js-category] [data-js-filter]');
//     buttonElements.forEach((button) => {
//         const category = button.parentElement.parentElement.getAttribute("data-js-category");
//         button.addEventListener("click", (event) => {
//             const filter = event.currentTarget.getAttribute("data-js-filter");
//             const filtered = filterArticles(filter, category);
//             renderArticleList(filtered);
//         });
//     });

    const buttonCategories = document.querySelectorAll('[data-js-category]');
    buttonCategories.forEach((buttonCategory) => {
        const category = buttonCategory.getAttribute("data-js-category");
        const buttonElements = buttonCategory.querySelectorAll("[data-js-filter]");
        buttonElements.forEach((button) => {
            button.addEventListener("click", (event) => {
                const filter = event.currentTarget.getAttribute("data-js-filter");
                const filtered = filterArticles(filter, category);
                renderArticleList(filtered);
            });
        });
    });

    const resetButton = document.querySelector("[data-js-filter-reset]");
    resetButton.addEventListener("click", () => {
        renderArticleList(currentData.articles);
    });
}

function filterArticles(filterValue, filterCategory) {
    return currentData.articles.filter((article) => {
        return article.tags[filterCategory].includes(filterValue);
    });
}

function renderArticleList(articles) {
    const articleList = document.querySelector("[data-js-generate-articlelist]");
    articleList.innerHTML = articles.map((article) => {
        return `<li>
            <img src="./images/${article.teaserImg}" alt="${article.title}">
            <p class="card-title">${article.title}</p>
            <p class="author">${article.author}</p>
            <ul class="tag-list">
                ${article.tags.keywords.map(tag => `<li>${tag}</li>`).join(" ")}
                ${article.tags.projectphase.map(tag => `<li>${tag}</li>`).join(" ")}
                ${article.tags.modules.map(tag => `<li>${tag}</li>`).join(" ")}
                ${article.tags.fileFormat.map(tag => `<li>${tag}</li>`).join(" ")}
            </ul>
        </li>`;
    }).join("");
}

function getFilters(category) {
    return currentData.articles.flatMap((article) => {
        return article.tags[category];
    }).filter((tag, index, self) => {
        return self.indexOf(tag) == index;
    })
}

function renderFilterButtons() {
    const buttonCategories = document.querySelectorAll('[data-js-category]');
    buttonCategories.forEach((buttonCategory) => {
        const category = buttonCategory.getAttribute("data-js-category");
        const filters = getFilters(category).map((tag) => {
            return `<li><button class="button button-primary" data-js-filter="${tag}">${tag}</button></li>`;
        }).join("");
        buttonCategory.innerHTML = filters;
    });
}