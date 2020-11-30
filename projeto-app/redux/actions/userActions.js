import {ADD_USER_TOKEN, REMOVE_USER_TOKEN} from './actionTypes'

export const addUserToken = (user) => ({
    type: ADD_USER_TOKEN,
    payload: user
})

export const removeUserToken = () => ({
    type: REMOVE_USER_TOKEN
})