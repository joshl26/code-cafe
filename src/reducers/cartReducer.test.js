import { cartReducer, CartTypes } from './cartReducer';

describe('cartReducer', () => {
  it('adds a new item', () => {
    const initialCartState = [];
    const itemId = 1;

    const cartReducerOutput = cartReducer(
      initialCartState,
      { type: CartTypes.ADD, itemId },
    );

    const finalCartState = [{
      id: itemId,
      quantity: 1,
    }];

    expect(cartReducerOutput).toEqual(finalCartState);
  });
});
