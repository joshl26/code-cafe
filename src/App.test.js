import { screen, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('displays the logged in users username', async () => {
    render(<App />);
    await screen.findByText(/Tester/i);
  });
});
