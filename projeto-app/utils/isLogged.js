export default function getToken() {
    const token = sessionStorage.getItem('Authorization')

    if (token && typeof token === 'string') {
        return true
    }

    return false
}