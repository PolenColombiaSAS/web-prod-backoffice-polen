export const DialogReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_DIALOG':
        return {
          ...state,
          dialogTitle: action.payload.title,
          dialogContent: action.payload.content,
          dialogButtons: action.payload.actions,
          isDialogOpen: true,
        };
      case 'HIDE_DIALOG':
        return {
          ...state,
          dialogTitle: null,
          dialogContent: null,
          dialogButtons: null,
          isDialogOpen: false,
        };
      default:
        return state;
    }
  };