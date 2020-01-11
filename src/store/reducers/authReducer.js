const initState = {
    signedIn: false,
    show_signIn: false,
    signIn_error: '',
    signUp_error: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                show_signIn: true,
                signIn_error: action.err.message,
            }
        case 'LOGIN_SUCCESS':
            window.location = '/'
            return {
                show_signIn: false,
                signIn_error: ''
            }
        case 'SIGNUP_SUCCESSFUL':
            return {
                signedIn: true,
                signUp_error: ''
            }
        case 'SIGNUP_ERROR':
            return {
                signUp_error: action.err.message,
                show_signUp: true
            }
        case 'USER_DELETED':
            break
        case 'SHOW_SIGNUP_MODULE':
            return {
                ...state,
                show_signUp: true,
            }
        case 'SHOW_SIGNIN_MODULE':
            return {
                ...state,
                show_signIn: true,
            }
        case 'CLOSE_MODULE':
            return {
                ...state,
                show_signUp: false,
                show_signIn: false
            }
        default:
            return state
    }
    return 0;
}

export default authReducer