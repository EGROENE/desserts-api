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
                + "<i class='fas fa-" + params[0] + "'title='" + params[1] + "'></i>"
                + "<img src='" + dessert.photoUrl + "'>"
                + "</div>"
                + "<header>" + dessert.name + "</header>"
                + "<header> Category: " + dessert.category.replace(/_/g, ' ') + "</header>"
                + "<p>" + dessert.description + "</p>"
            + "</div>"
        });
    }
    console.log(dessertsHomepage);
    console.log(dessertsFavs);
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