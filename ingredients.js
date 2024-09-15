
const loadIngredient = async (searchKey) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchKey}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status : ${res.status}`)
        }
        const data = await res.json();
        displayCocktail(data.drinks);

    } catch (error) {
        console.log('error fetching data ' , error);
    }
}
const ingredientBox = document.getElementById('ingredient-collection');
ingredientBox.addEventListener('click', function(event){
    let childId = event.target.id;
    switch (childId) {
        case 'rum':
            loadIngredient('rum');
            break;
        case 'vodka':
            loadIngredient('vodka');
            break;
        case 'lemon':
            loadIngredient('lemon');
            break;
        case 'tequila':
            loadIngredient('tequila');
            break;
        case 'gin':
            loadIngredient('gin');
            break;
    
        default:
            console.log('waiting for filter button click');
            break;
    }
})
