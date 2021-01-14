const recipeView = (recipe) => `
  
  <div class="col-12">
      <div class="card">
          <h5 class="card-header text-center"> ${recipe.name}</h5>   
          <div class="card-body">
           <p class="card-text">${recipe.description}</p>
            <ul class="list-group">
                <li class="list-group-item">Time to make: ${recipe.minutes}</li>
                <li class="list-group-item">Number os Ingredients: ${recipe.n_ingredients}</li>
                <li class="list-group-item">Number of Steps: ${recipe.n_steps}</li>
                <a role="button" class="btn btn-success btn-xs" onclick="window.open('/recipe/view/${recipe._id}')">View Recipe</a>
            </ul>
          </div>
        </div>
   </div>
  `;


const handleSubmit = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    try {
        const recipeDomRef = document.querySelector('#recipeItems');
        const ref = await fetch(`/api/search-recipe/?search=${searchVal}`);
        const searchResults = await ref.json();
        let recipeHtml = [];
        searchResults.forEach(recipe => {
            recipeHtml.push(recipeView(recipe));
        });
        recipeDomRef.innerHTML = recipeHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }
}