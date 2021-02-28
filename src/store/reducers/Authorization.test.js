import reducer from './Authorization';
import * as actionTypes from '../actions/actionTypes';

describe('authorization reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  })

  it('should store the token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    }, { 
        type: actionTypes.AUTH_SUCESS,  
        idToken: 'random-token',
        userId: 'random-user-id'
    })).toEqual({
      token: 'random-token',
      userId: 'random-user-id',
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  })
});