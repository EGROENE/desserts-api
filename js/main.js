//const apiURL = 'https://freerandomapi.cyclic.app/api/v1/desserts?category=Ice_Cream&limit=24';
const apiURL = 'https://freerandomapi.cyclic.app/api/v1/desserts?limit=200';
const dessertsHomepage = document.getElementById('desserts-container-homepage');

// Add flavors from API to main array, populate homepage upon loading:
async function getDesserts() {
    const response = await fetch(apiURL);
    const allDessertsArr = await response.json();

    // Add flavors to main array:
    let mainArray = [];
    for (let i = 0; i < allDessertsArr.data.length; i+= 5) {
        mainArray.push(allDessertsArr.data[i]);
    }
    console.log(mainArray);

    // Populate homepage from mainArray:
    for (let dessert of mainArray) {
        dessertsHomepage.innerHTML += 
            "<div class='main-dessert'>"
            + "<div class='dessert-img-container'>"
            + "<img src='" + dessert.photoUrl + "'>"
            + "</div>"
            + "<header>" + dessert.name + "</header>"
            + "<header> Category: " + dessert.category.replace(/_/g, ' ') + "</header>"
            + "<p>" + dessert.description + "</header>"
            + "</div>"
    }
}
getDesserts();

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