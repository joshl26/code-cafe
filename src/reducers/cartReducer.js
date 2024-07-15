export const initialCartState = [];

const findItem = (cart, itemId) => cart.find((item) => item.id.itemId === itemId);

export const CartTypes = {
  ADD: 'ADD',
};

export const cartReducer = (state, action) => {
  console.log(state);
  console.log(action);

  switch (action.type) {
    case CartTypes.ADD:
      if (findItem(state, action.itemId)) {
        return state.map((item) => (item.id.itemId === action.itemId
          ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [
        ...state,
        { id: action.itemId, quantity: 1 },
      ];
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};
