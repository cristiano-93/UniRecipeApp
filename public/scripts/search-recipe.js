const handleSave = async (id) => {
    await fetch('/api/saved-recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
    })
};


const recipeView = (recipe) => `
  
  <div class="col-12">
      <div class="card">
          <h5 class="card-header"> ${recipe.name}</h5>   
          <div class="card-body">
           <p class="card-text">${recipe.description}</p>
            <ul class="list-group">
                <li class="list-group-item">Time to make: ${recipe.n_minutes}</li>
                <li class="list-group-item">Number os Ingredients: ${recipe.n_ingredients}</li>
                <li class="list-group-item">Number of Steps: ${recipe.n_steps}</li>
            </ul>
          </div>
          <a href="#" class="btn btn-primary" onclick="handleSave('${recipe._id}')">Save to Favorites</a>
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