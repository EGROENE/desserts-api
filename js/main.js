//const apiURL = 'https://freerandomapi.cyclic.app/api/v1/desserts?category=Ice_Cream&limit=24';
const apiURL = 'https://freerandomapi.cyclic.app/api/v1/desserts?limit=200';

let mainArray = [];

// Add flavors from API to main array:
async function getDesserts() {
    const response = await fetch(apiURL);
    const allDessertsArr = await response.json();

    // Add flavors to main array:
    /* let mainArray = []; */
    for (let i = 0; i < allDessertsArr.data.length; i+= 5) {
        mainArray.push(allDessertsArr.data[i]);
    }
    console.log(mainArray);
}
//getDesserts();

// Function to populate homepage, favs modal:
async function popSections() {
    await getDesserts();
    const dessertsHomepage = document.getElementById('desserts-container-homepage');
    const dessertsFavs = document.getElementById('desserts-container-favs');

    for (let dessert of mainArray) {
        // This consolidation can be seen around min 17 of Andrey's video
        [dessertsHomepage, dessertsFavs].map((section) => {
            // Params are equal to one of the arrays, depending on whether the section is dessertsHomepage or not
            const params = section === dessertsHomepage
            ? ['heart', 'Add to Favorites']
            : ['times', 'Remove from Favorites'];
            section.innerHTML += 
            "<div class='dessert'>"
                + "<div class='dessert-img-container'>"
                + "<button class='favs-btn' title='" + params[1] + "'><i class='fas fa-" + params[0] + "'></i></button>"
                + "<img src='" + dessert.photoUrl + "'>"
                + "</div>"
                + "<header>" + dessert.name + "</header>"
                + "<header> Category: " + dessert.category.replace(/_/g, ' ') + "</header>"
                + "<p>" + dessert.description + "</p>"
            + "</div>"
        });
    }

    // ADD / DEL FROM HOMEPAGE, FAVS
    // Should be async, awaiting popSections:
    const allDesserts = document.querySelectorAll('.dessert');
    const main = document.getElementById('desserts-container-homepage');
    const favs = document.getElementById('desserts-container-favs');
    // Get all fav btns:
    const favBtns = document.querySelectorAll('.favs-btn');

    // Add the event listener to each fav-btn to add/delete
    favBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
        const direction = btn.parentElement.parentElement.parentElement.id === 'main' ? 'toFavs' : 'toMain';
        updateCollections(btn.id, direction);
        console.log('hi')
        });
    });

    // Function that updates collections:
    const updateCollections = (id, direction) => {
        // Directions to remove/append 'toFavs' 'toMain'
        let element;
        const params = direction === 'toFavs' ? [main, favs] : [favs, main];
    
        Object.values(params[0].children).map((item) => {
        if (item.id === id) {
            element = item;
            item.remove();
            params[1].appendChild(element);
        }
        });
    };
}
popSections();

// FAV MODAL JS
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Modal/Full site modal 'open buttons'
for (const elem of openModal) {
    elem.addEventListener('click', function() {
        document.getElementById('favs').classList.add(isVisible);
    })
}

// Remove isVisible class from elements in HTML with data-close attribute upon click:
for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        document.getElementById('favs').classList.remove(isVisible);
    })
}