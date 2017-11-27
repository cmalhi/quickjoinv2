export const selectRecipe = (recipe) => {
  console.log('you clicked on a recipe');
  return {
    type: "RECIPE_SELECTED",
    payload: recipe
  }
};