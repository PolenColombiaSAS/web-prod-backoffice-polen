export const LoadingReducer = (state, action) => {

    switch (action.type) {
        case '[Loading] - Show':
            const newContadorShow = state.contador + 1;
            return {
                ...state,
                contador: newContadorShow,
                loading: newContadorShow > 0,
            }
        case '[Loading] - Hide':
            const newContadorHide = state.contador - 1;
            return {
                ...state,
                contador: newContadorHide,
                loading: newContadorHide > 0,
            }

        default:
            return state;
    }

}

