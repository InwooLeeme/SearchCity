const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const search = document.querySelector('.search');
const infoBar = document.querySelector('.suggestions');
const cities = [];

fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => cities.push(...data));


function findMatch(inputWords, cities){
    return cities.filter(place => {
        const regex = new RegExp(inputWords,'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
};

function displayMatch(){
    let currentText = this.value;
    let result = findMatch(currentText,cities);
    const html = result.map(place => {
        return `
        <li class="information">
        <span class="name">
        ${place.city}, ${place.state}
        </span>
        <span class="population">population : ${place.population}</span>
        </li>
        `
    }).join('');
    infoBar.innerHTML = html;
}

function init(){
    search.addEventListener('change',displayMatch);
    search.addEventListener('keyup',displayMatch);
}
init();