import * as actionTypes from '../actions/actionTypes';
import { addIng, errIng, remIng, setIng } from '../utility/burgerUtility'

const initialState = {
  ingredients: null, 
  totalPrice: 4,
  error: false,
  building: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIng(state, action);
    case actionTypes.REMOVE_INGREDIENT: return remIng(state, action);
    case actionTypes.SET_INGREDIENTS: return setIng(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return errIng(state, action);
    default: return state;
  }
};

export default reducer;