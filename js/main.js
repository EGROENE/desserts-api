const apiURL = 'https://freerandomapi.cyclic.app/api/v1/desserts?limit=200';

let main = document.getElementById('desserts-container-homepage');
let favs = document.getElementById('desserts-container-favs');

// Function to call data from API, perform subsequent actions:
async function getDesserts() {
    // Call API & convert to json:
    const response = await fetch(apiURL);
    let allDessertsArr = await response.json();

    // Add data from API to mainArray:
    // mainArray() will be used to populate homepage upon pageload
    let mainArray = [];
    for (let i = 0; i < allDessertsArr.data.length; i+= 5) {
        mainArray.push(allDessertsArr.data[i]);
    }

    // Populate homepage:
    for (let dessert of mainArray) {
        main.innerHTML +=
        "<div id='" + dessert._id + "' class='dessert' data-name='" + dessert.name + "' data-category='" + dessert.category.toLowerCase().replace(/_/g, '-') + "'>"
                + "<div class='dessert-img-container'>"
                + "<button class='fav-btn' title='Add to Favorites'><i class='icon fas fa-heart'></i></button>"
                + "<img src='" + dessert.photoUrl + "'>"
                + "</div>"
                + "<header>" + dessert.name + "</header>"
                + "<header> Category: " + dessert.category.replace(/_/g, ' ') + "</header>"
                + "<p>" + dessert.description + "</p>"
            + "</div>"
    }
    const getCategoryTotals = () => {
        // Functionality to display totals:
        const totalsAreaHomepage = document.getElementById('totals-area-homepage');
        const totalsAreaFavs = document.getElementById('totals-area-favs');

        // Reset HTML whenever called:
        totalsAreaHomepage.innerHTML = ''
        totalsAreaFavs.innerHTML = ''
        // Display section header at all times:
        totalsAreaHomepage.innerHTML += "<header>Category Totals</header>"
        totalsAreaFavs.innerHTML += "<header>Category Totals</header>"

        // Get each collection's DOM:
        let mainDesserts = document.querySelectorAll('#desserts-container-homepage .dessert');
        let favDesserts = document.querySelectorAll('#desserts-container-favs .dessert');

        // Function to remove duplicates:
        // one way:
        /* function removeDuplicates(arr) {
            return arr.filter((item, 
                index) => arr.indexOf(item) === index);
        } */
        // another way:
        function removeDuplicates(arr) {
            return [...new Set(arr)];
        }

        // Categories in main collection:
        let categoriesArrayMain = [];
        for (let dessert of mainDesserts) {
            categoriesArrayMain.push(dessert.dataset.category.toLowerCase().replace(/_/g, ''));
        }
        console.log(categoriesArrayMain);
        let categoriesArrayMainFiltered = removeDuplicates(categoriesArrayMain);
        console.log(categoriesArrayMainFiltered);

        // Initialize tally for each unique category (item in filtered array):
        // If more categories are added, log the filtered array to the console & add corresponding vars for the new categories. Also add them to the logic statements below.
        // Ask if there is a way to dynamically create variables (tally vars below), or another way to count categories automatically if more are added in the future.
        let cookieTotalMain = 0;
        let donutTotalMain = 0;
        let icecreamTotalMain = 0;
        
        // Find how many times each item in filtered array appears in unfiltered array:        
        // Or, see how many elems currently in DOM have data-category matching each category in filtered array:
        for (let dessert of mainDesserts) {
            if (dessert.dataset.category === 'cookie') {
                cookieTotalMain += 1;
            }
            if (dessert.dataset.category === 'donut') {
                donutTotalMain += 1;
            }
            if (dessert.dataset.category === 'ice-cream') {
                icecreamTotalMain += 1;
            }
        }

        // Display title in totals section for each item in filtered array:
        for (let category of categoriesArrayMainFiltered) {
            let categoryTotal;
            if (category === 'cookie') {
                categoryTotal = cookieTotalMain;   
            }
            if (category === 'donut') {
                categoryTotal = donutTotalMain;   
            }
            if (category === 'ice-cream') {
                categoryTotal = icecreamTotalMain;   
            }
            totalsAreaHomepage.innerHTML += "<p>" + category.replace(/-/g, ' ') + ": " + categoryTotal + "</p>";
        }
        
        // Categories in favs collection:
        let categoriesArrayFavs = [];
        for (let dessert of favDesserts) {
            categoriesArrayFavs.push(dessert.dataset.category.toLowerCase().replace(/_/g, ' '));
        }
        console.log(categoriesArrayFavs);
        let categoriesArrayFavsFiltered = removeDuplicates(categoriesArrayFavs);
        console.log(categoriesArrayFavsFiltered);

        // Initialize tally for each unique category (item in filtered array):
        // If more categories are added, log the filtered array to the console & add corresponding vars for the new categories. Also add them to the logic statements below.
        // Ask if there is a way to dynamically create variables (tally vars below), or another way to count categories automatically if more are added in the future.
        let cookieTotalFavs = 0;
        let donutTotalFavs = 0;
        let icecreamTotalFavs = 0;
        
        // Find how many times each item in filtered array appears in unfiltered array:        
        // Or, see how many elems currently in DOM have data-category matching each category in filtered array:
        for (let dessert of favDesserts) {
            if (dessert.dataset.category === 'cookie') {
                cookieTotalFavs += 1;
            }
            if (dessert.dataset.category === 'donut') {
                donutTotalFavs += 1;
            }
            if (dessert.dataset.category === 'ice-cream') {
                icecreamTotalFavs += 1;
            }
        }

        // Display title in totals section for each item in filtered array:
        for (let category of categoriesArrayFavsFiltered) {
            let categoryTotal;
            if (category === 'cookie') {
                categoryTotal = cookieTotalFavs;   
            }
            if (category === 'donut') {
                categoryTotal = donutTotalFavs;   
            }
            if (category === 'ice-cream') {
                categoryTotal = icecreamTotalFavs;   
            }
            totalsAreaFavs.innerHTML += "<p>" + category.replace(/-/g, ' ') + ": " + categoryTotal + "</p>"
        }
    }
    getCategoryTotals();

    // Get all favBtns, add EL for adding/removing functionality:
    let favBtns = document.querySelectorAll('.fav-btn');
    favBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            item = btn.parentElement.parentElement;
            // If id is 'desserts-container-array', toFavs set as the direction. Otherwise, toMain is set.
            const direction = item.parentElement.id === 'desserts-container-homepage' ? 'toFavs' : 'toMain';
            updateCollections(item.id, direction);
        })
    });

    // Get all sort buttons so that an event listener can be added to each one:
    let allSortBtns = document.querySelectorAll('.sort-btn');

    // Individual btns, for purpose of disabling/enabling again at appropriate times:
    let homepageAlphaSortBtn = document.getElementById('hp-alpha-sort-btn');
    let homepageRevAlphaSortBtn = document.getElementById('hp-rev-alpha-sort-btn');
    let favsAlphaSortBtn = document.getElementById('favs-alpha-sort-btn');
    let favsRevAlphaSortBtn = document.getElementById('favs-rev-alpha-sort-btn');

    // Function that adds/removes the individual desserts from collections:
    const updateCollections = (id, direction) => {
        for (btn of allSortBtns) {
            btn.disabled = false;
        }
        
        let element; // see element = item below

        // If direction is toFavs, [main, favs] are the params, and vice versa:
        const params = direction === 'toFavs' ? [main, favs] : [favs, main]

        // Map thru the children of main or favs by item:
        Object.values(params[0].children).map((item) => {
            // item.id is from the html originally generated after API was called
            // Below checks if id from allDesserts item is equal to the item from params[0] (one of the collections) - this makes the function apply only to the particular dessert
            if (item.id === id) {

                // This var stores the value of item, even after it is removed. Nothing will be added to favs otherwise.
                element = item;

                // Change title of fav btn, depending on collection the corresponding item is in:
                const titles = item.parentElement.id === 'desserts-container-homepage' ? ['Add to Favorites', 'Remove from Favorites'] : ['Remove from Favorites', 'Add to Favorites'];
                let btn = item.firstChild.firstChild;
                btn.title = titles[1]

                // Remove item from particular collection:
                item.remove();

                // Gets first element of 'element' that has class name 'icon':
                const icon = element.getElementsByClassName('icon')[0];

                // icon.classList returns an object like this: {0: 'icon', 1: 'fas', 2: 'fa-times'}
                // So, access only the values of this object. If 'fa-heart' is included in these values, iconList is set to ['fa-heart', 'fa-times]. If not, it's set to ['fa-times', 'fa-heart']
                const iconList = Object.values(icon.classList).includes('fa-heart')
                    ? ['fa-heart', 'fa-times']
                    : ['fa-times', 'fa-heart'];

                // If current icon is 'fa-heart', it is removed when favs btn is clicked...
                icon.classList.remove(iconList[0]);

                // ... and replaced with the alternative, which is 'fa-times' in this case, and vice versa.
                icon.classList.add(iconList[1]);

                // Element is added to either main or favs, depending again on the direction (see 1st part of updateCollections())
                params[1].appendChild(element);

                // Display updated category totals after adding/removing items:
                getCategoryTotals();
            }
          });
      };
      
      for (let btn of allSortBtns) {
        btn.addEventListener('click', function() {
            // Disable/enable certain btns onclick:
            if (btn === homepageAlphaSortBtn) {
                if (homepageRevAlphaSortBtn.disabled) {
                    homepageRevAlphaSortBtn.disabled = false;
                }
                homepageAlphaSortBtn.disabled = true;
            }
            if (btn === homepageRevAlphaSortBtn) {
                if (homepageAlphaSortBtn.disabled) {
                    homepageAlphaSortBtn.disabled = false;
                }
                homepageRevAlphaSortBtn.disabled = true;
            }
            if (btn ===favsAlphaSortBtn) {
                if (favsRevAlphaSortBtn.disabled) {
                favsRevAlphaSortBtn.disabled = false;
                }
            favsAlphaSortBtn.disabled = true;
            }
            if (btn ===favsRevAlphaSortBtn) {
                if (favsAlphaSortBtn.disabled) {
                favsAlphaSortBtn.disabled = false;
                }
            favsRevAlphaSortBtn.disabled = true;
            }

            // Get each collection's DOM:
            // Must be inside this EL so the DOMs are current when btn is clicked
            let mainDesserts = document.querySelectorAll('#desserts-container-homepage .dessert');
            let favDesserts = document.querySelectorAll('#desserts-container-favs .dessert');

            // Make desserts in each collection's DOM into an iterable array - this will be resorted & whose sorted items will be appended to appropriate collection:
            let mainDessertsArray = Array.from(mainDesserts);
            let favDessertsArray = Array.from(favDesserts);
            
            // If the btn's classlist contains class pertaining to the homepage sort btns, the main DOM & an iterable array of the desserts it contains is set as the first item in two arrays, one containing the DOMs, the other the desserts in the corresponding DOM.
            // If the btn's classlist contains a class pertaining to the fav modal sort btns the favs DOM & the desserts it contains is set as the first item in these two arrays.
            // The first index of collectionArrays is what will be sorted.
            // The first index of collectionDOMs is what will be populated by the elements in collectionArrays[0].
            let collectionDOMs = Object.values(btn.classList).includes('hp-sort-btn') ? [main, favs] : [favs, main];
            let collectionArrays = Object.values(btn.classList).includes('hp-sort-btn') ? [mainDessertsArray, favDessertsArray] : [favDessertsArray, mainDessertsArray];

            // Sort items in desserts array for corresponding collection:
            collectionArrays[0].sort(function(a, b) {
                if ( a.dataset.name < b.dataset.name ){
                    // Sort alphabetically:
                    if (Object.values(btn.classList).includes('sort-alpha')) {
                        return -1;
                    } else { // Sort reverse-alphabetically:
                        return 1;
                    }
                }
                if ( a.dataset.name > b.dataset.name ){
                    // Sort alphabetically:
                    if (Object.values(btn.classList).includes('sort-alpha')) {
                        return 1;
                    } else { // Sort reverse-alphabetically:
                        return -1;
                    }
                }
                return 0;
                // Append resorted desserts to appropriate collection:
            }).forEach(function(ele) {
                collectionDOMs[0].appendChild(ele);
            })
        })
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