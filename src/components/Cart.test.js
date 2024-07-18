/* eslint-disable import/no-extraneous-dependencies */
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import Cart from './Cart';
import { items } from '../items';
import server from '../mocks/server';

describe('Cart Errors', () => {
  it('shows checkout failure error', async () => {
    const testErrorMessage = 'Code Café is closed';
    server.use(
      rest.post('/api/orders', async (req, res, ctx) => {
        res(ctx.status(500), ctx.json({ error: testErrorMessage }));
      }),
    );
    const cart = [{ itemId: items[0].itemId, quantity: 1 }];
    const dispatch = jest.fn(() => {});
    render(
      <Cart cart={cart} dispatch={dispatch} items={items} />,
    );
    expect(screen.getByRole('button', { name: /Order Now/i })).toBeDisabled();
  });
});
