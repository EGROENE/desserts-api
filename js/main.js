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