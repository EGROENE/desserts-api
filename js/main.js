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

let dessertsHomepage = '';
let dessertsFavs = '';

// Function to populate homepage, favs modal:
async function popSections() {
    await getDesserts();
    /* const dessertsHomepage = document.getElementById('desserts-container-homepage');
    const dessertsFavs = document.getElementById('favs'); */
    dessertsHomepage = document.getElementById('desserts-container-homepage');
    dessertsFavs = document.getElementById('desserts-container-favs');
    for (let dessert of mainArray) {
        // This consolidation can be seen around min 17 of Andrey's video
        //[dessertsHomepage, dessertsFavs].map((section) => {
        [dessertsHomepage].map((section) => {
            // Params are equal to one of the arrays, depending on whether the section is dessertsHomepage or not
            const params = section === dessertsHomepage
            ? ['heart', 'Add to Favorites']
            : ['times', 'Remove from Favorites'];
            section.innerHTML += 
            "<div class='dessert'>"
                + "<div class='dessert-img-container'>"
                + "<button class='fav-btn'><i class='fas fa-" + params[0] + "'title='" + params[1] + "'></i></button>"
                + "<img src='" + dessert.photoUrl + "'>"
                + "</div>"
                + "<header>" + dessert.name + "</header>"
                + "<header> Category: " + dessert.category.replace(/_/g, ' ') + "</header>"
                + "<p>" + dessert.description + "</p>"
            + "</div>"
        });
    }
}
//popSections();

// Function to del from homepage, add to favs:
/* const favBtns = document.querySelectorAll('.fav-btn');
for (let btn of favBtns) {
    console.log('hi')
    let btnIndex = favBtns.indexOf(btn);
    btn.addEventListener('click', function() {
        let dessertsArray = btn.parentElement.parentElement.parentElement;
        dessertsArray.removeChild(dessertsArray.children[btnIndex]);
    })
} */
async function favsFunctionality() {
    await popSections();
    console.log(dessertsHomepage);
    console.log(dessertsFavs);
    // Del from homepage:
    let favBtns = document.querySelectorAll('.fav-btn');
    favBtns = Array.from(favBtns);
    for (let btn of favBtns) {
        btn.addEventListener('click', function() {
            let dessertsArray = btn.parentElement.parentElement.parentElement;
            let dessert = btn.parentElement.parentElement
            // particular dessert has to be removed:
            dessertsArray.removeChild(dessert);
            // Add to favs modal:
            btn.firstChild.classList.remove('fa-heart');
            btn.firstChild.classList.add('fa-times');
            btn.classList.remove('fav-btn');
            btn.classList.add('del-fav-btn');
            dessertsFavs.appendChild(dessert);
            // Put JS onclick EL to del from favs & add back to homepage here, since onclick of fav btn, the del-fav btn & its func is created from above onclick event:
            let delFavBtns = document.querySelectorAll('.del-fav-btn');
            delFavBtns = Array.from(delFavBtns);
            for (let btn of delFavBtns) {
                btn.addEventListener('click', function() {
                    console.log('hi');
                    let favDessertsArray = btn.parentElement.parentElement.parentElement;
                    let favDessert = btn.parentElement.parentElement;
                    favDessertsArray.removeChild(favDessert);
                    btn.firstChild.classList.remove('fav-heart');
                    btn.firstChild.classList.add('fav-btn');
                    btn.classList.remove('del-fav-btn');
                    btn.classList.add('fav-btn');
                    dessertsArray.appendChild(favDessert);
                })
            }
        })
    }

}
favsFunctionality();

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