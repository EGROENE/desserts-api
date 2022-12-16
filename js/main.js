const apiURL = 'https://freerandomapi.cyclic.app/api/v1/desserts?limit=200';

let main = document.getElementById('desserts-container-homepage');
let favs = document.getElementById('desserts-container-favs');

// Add flavors from API to main array:
async function getDesserts() {
    const response = await fetch(apiURL);
    let allDessertsArr = await response.json();

    // Add flavors to main array:
    let mainArray = [];
    for (let i = 0; i < allDessertsArr.data.length; i+= 5) {
        mainArray.push(allDessertsArr.data[i]);
    }

    // POPULATE HOMEPAGE HERE
    for (let dessert of mainArray) {
        main.innerHTML +=
        "<div id='" + dessert._id + "' class='dessert'>"
                + "<div class='dessert-img-container'>"
                + "<button class='fav-btn'><i class='icon fas fa-heart'></i></button>"
                + "<img src='" + dessert.photoUrl + "'>"
                + "</div>"
                + "<header>" + dessert.name + "</header>"
                + "<header> Category: " + dessert.category.replace(/_/g, ' ') + "</header>"
                + "<p>" + dessert.description + "</p>"
            + "</div>"
    }

    let favBtns = document.querySelectorAll('.fav-btn');

    favBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            item = btn.parentElement.parentElement;
            const direction = item.parentElement.id === 'desserts-container-homepage' ? 'toFavs' : 'toMain';
            updateCollections(item.id, direction);
        })
    });

    const updateCollections = (id, direction) => {
        let element;
        const params = direction === 'toFavs' ? [main, favs] : [favs, main]

        Object.values(params[0].children).map((item) => {
            // item.id is from the html originally generated after API was called
            // Below checks if id from allDesserts item is equal to the item from params[0] (one of the collections) - this makes the function apply only to the particular dessert
            if (item.id === id) {
                console.log(item)
                element = item;
                item.remove();
                const icon = element.getElementsByClassName('icon')[0];
                const iconList = Object.values(icon.classList).includes(
                    'fa-heart'
                )
                    ? ['fa-heart', 'fa-times']
                    : ['fa-times', 'fa-heart'];
                icon.classList.remove(iconList[0]);
                icon.classList.add(iconList[1]);
                params[1].appendChild(element);
            }
          });
      };
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