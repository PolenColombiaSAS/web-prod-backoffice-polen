export const AdminLayoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_OPEN_DRAWER':
      return {
        ...state,
        isOpen: action.payload,
        itemsSelected: !action.payload ? {} : state.itemsSelected 
      };   
    case 'SET_ITEM':
      return {
        ...state,
        itemsSelected: {
          ...state.itemsSelected,
          [action.payload.nivel]: action.payload.item
        }
      };
      case 'SET_DRAWER_WIDTH_CLOSE':
        return {
          ...state,
          drawerwidthclose:action.payload
        };
    default:
      return state;
  }
};