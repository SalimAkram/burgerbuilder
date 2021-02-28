import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authorizationStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authorizationSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCESS,
    idToken: token,
    userId: userId
  };
};

export const authorizationFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

export const checkAuthorizationTimeOut = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
    console.log('logged out')
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authorization = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authorizationStart());
    const authorizationData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }
    axios.post(url, authorizationData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); 
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId)
        dispatch(authorizationSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthorizationTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authorizationFailed(error.response.data.error));
      });
  };
};

export const setAuthRedirect = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authorizationCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authorizationSuccess(token, userId));
        dispatch(checkAuthorizationTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
      };
    };
  };
};
