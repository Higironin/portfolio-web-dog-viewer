const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector('.breeds');
const button = document.querySelector('.add-new');
const image = document.querySelector('.dog-img');
const spinner = document.querySelector('.spinner');

// Creating an Array of all Breeds and push it into select
const promise = fetch(BREEDS_URL);
promise
    .then(response => {
        return response.json();
    })
    .then(data => {
        const breedsArray = Object.keys(data.message);
        for (let i = 0; i < breedsArray.length; i++) {
            const option = document.createElement('option');
            option.value = breedsArray[i];
            option.innerText = breedsArray[i].toUpperCase();
            select.appendChild(option);
        }
    });

select.addEventListener('change', function(e) {
    if (select.value !== "- Select Breed -") {
        const url = `https://dog.ceo/api/breed/${e.target.value}/images/random`;
        getNewDog(url);
    }
});

// --- Another way of using AJAX ---
//
// async function getNewDog(event) {
//     const res = await fetch("https://dog.ceo/api/breeds/image/random");
//     const resJson = await res.json();
//     image.src = resJson.message;

function getNewDog(url) {
    //loading spinner
    spinner.classList.add("show");
    image.classList.remove("show");
    const promise = fetch(url);
    promise
        .then(response => {
            return response.json();
        })
        .then(data => {
            image.src = data.message;
        });
}

button.addEventListener('click', function() {
    if (select.value !== "- Select Breed -") {
        const url = `https://dog.ceo/api/breed/${select.value}/images/random`;
        getNewDog(url);
    }
});

//stop loading spinner
image.addEventListener('load', function() {
    spinner.classList.remove("show");
    image.classList.add("show");
});