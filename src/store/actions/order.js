import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};

export const purchaseFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_FAILED,
    error: error
  };
};

export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START
  };
};

export const purchase = (orderData) => {
  return dispatch => {
     dispatch(purchaseStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseSuccess(response.data.name, orderData))
        console.log(response.data);
      })
      .catch(error => {
       dispatch(purchaseFailed(error))
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSucces = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
   axios.get('/orders.json')
      .then(response => {
        console.log(response.data)
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key], 
            id: key
          });
        }
        dispatch(fetchOrdersSucces(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};