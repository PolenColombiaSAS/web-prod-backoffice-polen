// SnackBarReducer.js
export const SnackBarReducer = (state, action) => {
    switch (action.type) {
        case 'SNACKBAR_OPEN':
            return {
                ...state,
                isOpen: true,
                message: action.message,
                severity: action.severity
            }
        case 'SNACKBAR_CLOSE':
            return {
                ...state,
                isOpen: false,
                message: "",
                severity: 'success'
            }
        default:
            return state;
    }
};
