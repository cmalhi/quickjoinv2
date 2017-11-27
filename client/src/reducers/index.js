import {combineReducers} from 'redux';
import ToggleRecipeReducer from './toggle-recipe-reducer';
import RecipesReducer from './recipes-reducer';

const allReducers = combineReducers({
  selected: ToggleRecipeReducer,
  recipes: RecipesReducer
});

export default allReducers;