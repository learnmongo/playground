import generateRecipes from "./fake-recipes.js";
const recipes = generateRecipes(2);

console.dir(recipes, { depth: null })