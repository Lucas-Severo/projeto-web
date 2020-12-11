import { ADD_USER_TOKEN, REMOVE_USER_TOKEN } from '../actions/actionTypes'
import CookieUtils from '../../utils/CookieUtils'

const initialState = {
    userId: CookieUtils.getCookie('USER_ID') || 0,
    userEmail: '',
    userToken: CookieUtils.getCookie('JWT_TOKEN') || '',
    userName: CookieUtils.getCookie('USER_NAME') || ''
}

const cleanedState = {
    userId: 0,
    userEmail: '',
    userToken: '',
    userName: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER_TOKEN:
            state.userId = action.payload.id
            state.userEmail = action.payload.email
            state.userToken = action.payload.jwt
            state.userName = action.payload.userName
            
            CookieUtils.addCookie('JWT_TOKEN', state.userToken)
            CookieUtils.addCookie('USER_ID', state.userId)
            CookieUtils.addCookie('USER_NAME', state.userName)
            
            return {...state}
        case REMOVE_USER_TOKEN:
            CookieUtils.removeCookie('JWT_TOKEN')
            CookieUtils.removeCookie('USER_ID')
            CookieUtils.removeCookie('USER_NAME')

            state = cleanedState
            return {...state}
        default: 
            return {...state}
    }
}

export default userReducer