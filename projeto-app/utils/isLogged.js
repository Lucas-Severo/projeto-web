import {store} from '../redux/index'

export default function getToken() {
    const {userToken} = store.getState().userReducer

    const token = userToken

    if (token && typeof token === 'string') {
        return true
    }

    return false
}
