// Conversion factors
const conversionFactors = {
    volume: {
        ml: 1,
        cup: 236.588,
        tablespoon: 14.7868,
        teaspoon: 4.92892
    },
    weight: {
        g: 1,
        oz: 28.3495
    }
};

// Function to convert units
function convertUnit(amount, fromUnit, toUnit) {
    if (fromUnit === toUnit) return amount;
    
    let category;
    if (conversionFactors.volume[fromUnit] && conversionFactors.volume[toUnit]) {
        category = 'volume';
    } else if (conversionFactors.weight[fromUnit] && conversionFactors.weight[toUnit]) {
        category = 'weight';
    } else {
        return amount; // Cannot convert between different categories
    }

    const baseAmount = amount * conversionFactors[category][fromUnit];
    return baseAmount / conversionFactors[category][toUnit];
}

// Function to update recipe for new number of servings
function updateServings(originalServings, newServings, ingredients) {
    const factor = newServings / originalServings;
    return ingredients.map(ing => ({
        ...ing,
        amount: Math.round((ing.amount * factor) * 100) / 100 // Round to 2 decimal places
    }));
}

// Function to convert recipe to different unit system
function convertUnitSystem(ingredients, toSystem) {
    const conversions = {
        metric: { cup: 'ml', tablespoon: 'ml', teaspoon: 'ml', oz: 'g' },
        imperial: { ml: 'cup', g: 'oz' }
    };

    return ingredients.map(ing => {
        const newUnit = conversions[toSystem][ing.unit];
        if (newUnit) {
            const newAmount = convertUnit(ing.amount, ing.unit, newUnit);
            return { ...ing, amount: Math.round(newAmount * 100) / 100, unit: newUnit };
        }
        return ing;
    });
}

// Make functions available globally
window.recipeConversion = {
    updateServings,
    convertUnitSystem
};