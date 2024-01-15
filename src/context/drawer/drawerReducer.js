 const DrawerReducer = (state, action) => {
    switch (action.type) {
      case 'SHOW_DRAWER':
        return {
          ...state,
          drawerContent: action.payload.content,
          anchor: action.payload.anchor,
          isDrawerOpen: true,
        };
      case 'HIDE_DRAWER':
        return {
          ...state,
          drawerContent: null,
          isDrawerOpen: false,
        };
      default:
        return state;
    }
  };
  export default DrawerReducer