import { updateObject } from './utility'

export const purInit = (state, action) => {
 return updateObject(state, { purchased: false });
}

export const purStart = (state, action) => {
  return updateObject(state, { loading: true });
}

export const purFailed = (state, action) => {
  return updateObject(state, { loading: false });
}

export const fetchOStart = (state, action) => {
  return updateObject (state, { loading: true });
}

export const fetchOFailed =  (state, action) => {
  return updateObject(state, { loading: false });
}
