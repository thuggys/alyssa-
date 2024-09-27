// Sample recipe data
const recipes = [
    { 
        id: 1, 
        name: "Kawaii Pancakes", 
        description: "Fluffy pancakes with cute faces", 
        image: "https://via.placeholder.com/300x200.png?text=Kawaii+Pancakes", 
        prepTime: "20 mins", 
        difficulty: "Easy",
        ingredients: [
            { amount: 1, unit: "cup", name: "all-purpose flour" },
            { amount: 2, unit: "tablespoons", name: "sugar" },
            { amount: 2, unit: "teaspoons", name: "baking powder" },
            { amount: 1, unit: "cup", name: "milk" },
            { amount: 2, unit: "", name: "eggs" },
            { amount: 2, unit: "tablespoons", name: "melted butter" }
        ],
        instructions: [
            "Mix dry ingredients in a bowl.",
            "In another bowl, whisk together milk, eggs, and melted butter.",
            "Combine wet and dry ingredients, stirring until just mixed.",
            "Cook on a griddle until golden brown.",
            "Decorate with fruit to create cute faces!"
        ]
    },
    { 
        id: 2, 
        name: "Rainbow Smoothie", 
        description: "Colorful and healthy smoothie", 
        image: "https://via.placeholder.com/300x200.png?text=Rainbow+Smoothie", 
        prepTime: "10 mins", 
        difficulty: "Easy",
        ingredients: [
            { amount: 1, unit: "cup", name: "strawberries" },
            { amount: 1, unit: "cup", name: "mango chunks" },
            { amount: 1, unit: "cup", name: "spinach" },
            { amount: 1, unit: "cup", name: "blueberries" },
            { amount: 2, unit: "cups", name: "almond milk" },
            { amount: 2, unit: "tablespoons", name: "honey" }
        ],
        instructions: [
            "Layer fruits and spinach in a blender.",
            "Pour almond milk over the fruits.",
            "Add honey for sweetness.",
            "Blend until smooth.",
            "Pour into a glass and enjoy your rainbow!"
        ]
    },
    // ... Add similar detailed data for other recipes ...
];

// Function to create recipe cards
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <div class="recipe-card-content">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <div class="recipe-card-footer">
                <span>${recipe.prepTime} | ${recipe.difficulty}</span>
                <button class="favorite-btn" data-id="${recipe.id}">❤</button>
            </div>
            <a href="#" class="recipe-details" data-id="${recipe.id}">View Recipe</a>
        </div>
    `;
    return card;
}

// Function to render recipe cards
function renderRecipes(recipesToRender = recipes) {
    const recipeGrid = document.querySelector('.recipe-grid');
    recipeGrid.innerHTML = '';
    recipesToRender.forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipeGrid.appendChild(card);
    });
}

// Function to handle favoriting recipes
function handleFavorite(event) {
    if (event.target.classList.contains('favorite-btn')) {
        event.target.classList.toggle('favorited');
        const recipeId = event.target.getAttribute('data-id');
        // Here you would typically update the favorites in local storage or send to a server
        console.log(`Recipe ${recipeId} ${event.target.classList.contains('favorited') ? 'favorited' : 'unfavorited'}`);
    }
}

// Function to handle recipe search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) || 
        recipe.description.toLowerCase().includes(searchTerm)
    );
    renderRecipes(filteredRecipes);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderRecipes();
    document.querySelector('.recipe-grid').addEventListener('click', handleFavorite);
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
});

// Floating hearts (copied from script.js)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 300);

// Add this variable to keep track of the current recipe
let currentRecipe = null;

// Update the showRecipeDetails function
function showRecipeDetails(recipeId) {
    currentRecipe = recipes.find(r => r.id == recipeId);
    if (!currentRecipe) return;

    updateRecipeModal(currentRecipe);
}

// New function to update the recipe modal
function updateRecipeModal(recipe, newServings = null) {
    document.getElementById('recipeTitle').textContent = recipe.name;
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeImage').alt = recipe.name;
    document.getElementById('recipeDescription').textContent = recipe.description;
    document.getElementById('recipeDetails').textContent = `Prep Time: ${recipe.prepTime} | Difficulty: ${recipe.difficulty}`;

    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = '';

    let ingredients = recipe.ingredients;
    if (newServings) {
        ingredients = window.recipeConversion.updateServings(recipe.servings, newServings, ingredients);
    }

    ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = `${ing.amount} ${ing.unit} ${ing.name}`;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach((inst, index) => {
        const li = document.createElement('li');
        li.textContent = inst;
        instructionsList.appendChild(li);
    });

    document.getElementById('servings').value = newServings || recipe.servings;
    document.getElementById('recipeModal').style.display = 'block';
}

// Add event listeners for conversion tools
document.addEventListener('DOMContentLoaded', () => {
    const servingsInput = document.getElementById('servings');
    const convertServingsBtn = document.getElementById('convertServings');
    const unitSystemSelect = document.getElementById('unitSystem');

    convertServingsBtn.addEventListener('click', () => {
        const newServings = parseInt(servingsInput.value);
        if (currentRecipe && newServings > 0) {
            updateRecipeModal(currentRecipe, newServings);
        }
    });

    unitSystemSelect.addEventListener('change', () => {
        const newSystem = unitSystemSelect.value;
        if (currentRecipe) {
            const convertedIngredients = window.recipeConversion.convertUnitSystem(currentRecipe.ingredients, newSystem);
            const convertedRecipe = { ...currentRecipe, ingredients: convertedIngredients };
            updateRecipeModal(convertedRecipe);
        }
    });
});

// Event delegation for recipe details links
document.querySelector('.recipe-grid').addEventListener('click', (event) => {
    if (event.target.classList.contains('recipe-details')) {
        event.preventDefault();
        const recipeId = event.target.getAttribute('data-id');
        showRecipeDetails(recipeId);
    }
});

// Close modal when clicking on the close button
document.querySelector('.recipe-modal-content .close').addEventListener('click', () => {
    document.getElementById('recipeModal').style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('recipeModal')) {
        document.getElementById('recipeModal').style.display = 'none';
    }
});

// ... rest of the existing code ...