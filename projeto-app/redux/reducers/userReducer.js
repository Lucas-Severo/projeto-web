import { ADD_USER_TOKEN, REMOVE_USER_TOKEN } from '../actions/actionTypes'

const initialState = {
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
            return {...state}
        case REMOVE_USER_TOKEN:
            state = initialState
            return {...state}
        default: 
            return {...state}
    }
}

export default userReducer