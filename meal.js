const searchBtn = () => {
    let searchField = document.getElementById("search-field");
    const searchFieldText = searchField.value;

    if (searchFieldText == "") {
        let emptyMessage = document.getElementById("empty-message");
        emptyMessage.innerHTML = `
        <h3 class="text-center text-danger">Please search by food name</h3>
        `

    } else {
        let emptyMessage = document.getElementById("empty-message");
        emptyMessage.innerHTML = " ";
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
    }
    // empty search field
    searchField.value = " ";
}


const displayFood = (foods) => {
    const foodCard = document.getElementById("food-card");
    foodCard.textContent = " ";
   
        foods.forEach(food => {
            const createDiv = document.createElement("div");
            createDiv.classList.add("col")
            createDiv.innerHTML = `
            <div class="card">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                    <p class="card-text">${food.strInstructions.slice(0, 200)}</p>
                    <div class="text-center">
                    <button  class="border-0 bg-success text-light px-4 py-2" onClick=foodDetails("${food.idMeal}")>Details</button>
                    </div>
                </div>
               
             </div>
            `
            foodCard.appendChild(createDiv)
        
    })
}

const foodDetails = (foodDetails) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`
    fetch(url)
        .then(res => res.json())
        .then(data => DisplayDetails(data.meals[0]))
}


const DisplayDetails = (details) => {
    let detailsFood = document.getElementById("food-details");
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
    
        <div class="card mx-auto my-4" style="width: 30rem">
        <img src="${details.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h2>Code : ${details.idMeal}</h2>
            <h3 class="card-title">${details.strMeal}</h3>
            <h4>${details.strCategory}</h4>
            <h5>${details.strArea}</h5>
            <p class="card-text">${details.strInstructions.slice(0, 200)}</p>
            <div class="text-center">
            <a href="${details.strYoutube}" class="btn btn-primary text-center">Watch Video</a>
            </div>
            
        </div>  
                   
        </div>
        `
        detailsFood.appendChild(newDiv)
    
    
}
