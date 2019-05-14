import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case actionTypes.AUTH_SUCCESS: 
            return {
                 ...state,
                loading: false,
                error: null,
                token: action.idToken,
                userId: action.userId
            }
        
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authPath: action.path
            }
        default: 
            return state;
    }
}

export default reducer;