export const AuthReducer = (state, action) =>
{

    switch (action.type)
    {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            }
        case 'SET_CHECKING_AUTH':
            return {
                ...state,
                isCheckingAuth: action.payload
            }


        default:
            return state;
    }

}

