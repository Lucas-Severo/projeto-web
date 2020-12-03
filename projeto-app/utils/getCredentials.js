import {store} from '../redux/index'

class getCredentials {

    getUserToken() {
        const {userToken} = store.getState().userReducer
        const token = userToken

        if (token && typeof token === 'string') {
            return token
        }
    }

    getUserId() {
        const {userId} = store.getState().userReducer

        return userId
    }

}

export default new getCredentials()
