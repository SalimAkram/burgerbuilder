import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { purInit, purStart, purFailed, fetchOStart, fetchOFailed } from '../utility/orderUtility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

export const purSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { orderId: action.orderId });
    return updateObject(state, {
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    });
}

const fetchOSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}

//reminder to add .action to the return statement that contains the data you want to update from your action(s) 
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_INIT: return purInit(state, action);
    case actionTypes.PURCHASE_START: return purStart(state, action);   
    case actionTypes.PURCHASE_SUCCESS: return purSuccess(state, action);
    case actionTypes.PURCHASE_FAILED: return purFailed(state, action);
    case actionTypes.FETCH_ORDERS_START: return fetchOStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED: return fetchOFailed(state, action);
    default: return state;
  }
};

export default reducer