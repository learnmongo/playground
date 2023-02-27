import { randTextRange, randFood, randNumber, randWord, randSentence, randBoolean, randDrinks } from '@ngneat/falso';

const unitTypes = [undefined, "teaspoon", "tablespoon", "cup", "liter", "milliliter"];
const generateUnit = () => unitTypes[randNumber({ min: 0, max: 4 })]

const generateIngredient = () => ({
    "name": randFood({ origin: 'japan' }),
    "quantity": {
        ... (generateUnit() && { unit: generateUnit() }),
        "amount": randNumber({ min: 1, max: 10 })
    },
});

const generateIngredients = (count = 5) => {
    const ingredients = [];

    while (count--) {
        ingredients.push(generateIngredient());
    }

    return ingredients;
};

const generateDirections = (steps = 5) => randTextRange({ min: 10, max: 50, length: steps });

const generateRatings = () => randNumber({ min: 1, max: 5, length: randNumber({ min: 0, max: 5 }) });

export default function generateRecipes(documentCount = 100) {
    const recipes = [];

    while (documentCount--) {
        recipes.push({
            "title": randFood(),
            "servings": randNumber({ min: 1, max: 12 }),
            "calories_per_serving": randNumber({ min: 100, max: 800 }),
            "cook_time": randNumber({ min: 10, max: 120, precision: 5 }),
            "prep_time": randNumber({ min: 5, max: 30, precision: 5 }),
            "description": randSentence(),
            "ingredients": generateIngredients(randNumber({ min: 4, max: 10 })),
            "directions": generateDirections(randNumber({ min: 3, max: 8 })),
            ...generateRatings().length && { "ratings": generateRatings() },
            "vegetarian_options": randBoolean(),
            "suggested_drink": randDrinks(),
            "tags": randWord({ length: randNumber({ min: 1, max: 5 }) })
        });
    }

    // use('cookbook');
    // db.fake_recipes.insertMany(recipes);

    return recipes;
}