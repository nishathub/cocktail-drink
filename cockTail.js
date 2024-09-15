
const errorMessage = document.getElementById('error-message');
const loadCocktail = async (searchKey) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchKey}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            if(res.status === 404){
                errorMessage.innerHTML = `'${searchKey}' Not Found`;
            } else {
                errorMessage.innerHTML = `Error fetching data, please try again later`;
            }
            throw new Error(`HTTP error! status : ${res.status}`);
        } else {
            const data = await res.json();
            displayCocktail(data.drinks);
        }

    } catch (error) {
        console.log('error fetching data ' , error);
        errorMessage.innerHTML = `Error fetching data, please try again later`;
    }
    finally {
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 5000);
    }
};

const cardHolder = document.getElementById('card-holder');
const displayCocktail = (data) => {
    cardHolder.innerHTML = '';
    errorMessage.innerHTML = '';
    data.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src = "${element.strDrinkThumb}">
        <h4>${element.strDrink}</h4>
        <button onclick = 'loadDetails(${element.idDrink})' class="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
        `;
        cardHolder.appendChild(card);

    });

}

const loadDetails = async (drinkId) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    const res = await fetch(url);
    const data = await res.json();
    return showDetails(data.drinks[0]);

}
const modalTitle = document.getElementById('staticBackdropLabel');
const modalBody = document.getElementById('modal-body');
const showDetails = (data) => {
    console.log(data);
    modalTitle.innerText = data.strDrink;
    modalBody.innerHTML = `
    <img src = '${data.strDrinkThumb}'>
    <p>Ingredients : ${data.strIngredient1}, ${data?.strIngredient2}, ${data?.strIngredient3}, ${data.strIngredient4 ? data.strIngredient4 : ''}, etc.</p>
    <p>Category : ${data.strCategory}</p>

    `;
}
// search 
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress',function(event) {
    if (event.key === 'Enter'){
        loadCocktail(this.value);
    }
})
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function(){
    console.log('clicked');
    searchKey = searchField.value;
    if(searchKey === ''){
        alert('Search field is empty');
    } else {
        loadCocktail(searchKey);
        searchField.value = '';
    }
});
// show some items on window load
loadCocktail('p');