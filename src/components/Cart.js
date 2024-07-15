import PropTypes from 'prop-types';
import ItemType from '../types/item';
import './Cart.css';

function Cart({ cart, items }) {
  console.log(cart);
  console.log({ items });

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id.itemId}>
              <td>{item.quantity}</td>
              <td>{items.find((i) => i.itemId === item.id.itemId).title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Cart;
