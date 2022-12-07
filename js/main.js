const apiURL = 'https://freerandomapi.cyclic.app/api/v1/desserts?category=Ice_Cream&limit=24';
const flavsHomepage = document.getElementById('flavors-container-homepage');

// Add flavors from API to main array, populate homepage upon loading:
async function getFlavors() {
    const response = await fetch(apiURL);
    const allFlavorsArr = await response.json();

    // Add flavors to main array:
    let mainArray = [];
    for (let i = 0; i < allFlavorsArr.data.length; i++) {
        mainArray.push(allFlavorsArr.data[i]);
    }
    console.log(mainArray);

    // Populate homepage from mainArray:
    for (let flavor of mainArray) {
        flavsHomepage.innerHTML += 
            "<div class='main-flav'>"
            + "<div class='flav-img-container'>"
            + "<img src='" + flavor.photoUrl + "'>"
            + "</div>"
            + "<header>" + flavor.name + "</header>"
            + "<p>" + flavor.description + "</header>"
            + "</div>"
    }
}
getFlavors();

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