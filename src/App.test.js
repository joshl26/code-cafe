import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { items } from './items';
import { getOrders } from './mocks/data';

describe('App', () => {
  it('displays the logged in users username', async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByLabelText('Loading...'),
      ).not.toBeInTheDocument();
    });

    // Orders are stored correctly
    expect(getOrders()).toHaveLength(1);

    // await screen.findByText(/Tester/i);
  });

  it('allows the user to build a cart and place an order', async () => {
    render(<App />);

    // Home displays correctly
    await waitFor(() => {
      const thumbnails = screen.queryAllByTestId('thumbnail-component');
      expect(thumbnails).toHaveLength(items.length);
    });

    // Clicking a thumbnail navigates to the correct item page
    await userEvent.click(screen.getByRole('link', { name: /Tea/i }));
    await screen.findByRole('button', { name: /Add to Cart/i });

    // Items are successfully added to the cart
    await userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    await waitFor(() => {
      expect(screen.getByTestId('cart-quantity')).toHaveTextContent('1');
    });
    await userEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    await waitFor(() => {
      expect(screen.getByTestId('cart-quantity')).toHaveTextContent('2');
    });

    // Clicking the cart link navigate to the cart
    await userEvent.click(screen.getByRole('link', { name: /Cart/i }));
    await screen.findByLabelText(/Name/i);

    // The Order Now button is disabled until the required fields are present
    expect(screen.getByRole('button', { name: /Order Now/i })).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/Name/i), 'Big Nerd Ranch');
    await userEvent.type(screen.getByLabelText(/ZIP Code/i), '30316');
    expect(screen.getByRole('button', { name: /Order Now/i })).toBeEnabled();

    // Clicking the Order Now button results in a successful checkout
    await userEvent.click(screen.getByRole('button', { name: /Order Now/i }));
    await waitFor(() => {
      expect(screen.getByText(/Thank you for your order/i)).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByTestId('cart-quantity')).toHaveTextContent('0');
    });
  });
});
