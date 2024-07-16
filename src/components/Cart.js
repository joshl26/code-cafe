/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import ItemType from '../types/item';
import './Cart.css';
import CartRow from './CartRow';

function Cart({ cart, items, dispatch }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isEmployeeOfTheMonth, setIsEmployeeOfTheMonth] = useState(false);
  const debounceRef = useRef(null);
  const zipRef = useRef(null);
  // const [renderCounter, setRenderCount] = useState(0);

  const subTotal = isEmployeeOfTheMonth ? 0 : cart.reduce((acc, item) => {
    const detailItem = items.find((i) => i.itemId === item.id.itemId);
    const itemPrice = detailItem.salePrice ?? detailItem.price;
    return item.quantity * itemPrice + acc;
  }, 0);

  const taxPercentage = parseInt(zipCode.substring(0, 1) || '0', 10) + 1;
  const taxRate = taxPercentage / 100;
  const tax = subTotal * taxRate;
  const total = subTotal + tax;
  const isFormValid = zipCode.length === 5 && name.trim();

  // console.log('tax: ', tax);

  const submitOrder = (event) => {
    event.preventDefault();
    // console.log('name: ', name);
    // console.log('phone: ', phone);
    // console.log('zipcode: ', zipCode);
    // setRenderCount(renderCounter + 1);
    // console.log('Render Counter: ', renderCounter.current);
    // renderCounter.current += 1;
    // TODO
  };

  const setFormattedPhone = (newNumber) => {
    const digits = newNumber.replace(/\D/g, '');
    let formatted = digits.substring(0, 3);
    if (digits.length === 3 && newNumber[3] === '-') {
      formatted = `${formatted}-`;
    } else if (digits.length > 3) {
      formatted = `${formatted}-${digits.substring(3, 6)}`;
    }
    if (digits.length === 6 && newNumber[7] === '-') {
      formatted = `${formatted}`;
    } else if (digits.length > 6) {
      formatted = `${formatted}-${digits.substring(6, 10)}`;
    }
    if (digits.length === 10) {
      zipRef.current.focus();
    }
    setPhone(formatted);
  };

  const onNameChange = (newName) => {
    setName(newName);

    if (debounceRef) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      axios.get(`api/employees/isEmployeeOfTheMonth?name=${newName}`).then((response) => setIsEmployeeOfTheMonth(response?.data?.isEmployeeOfTheMonth)).catch(console.error);
    }, 300);
  };
  // console.log(cart);
  // console.log({ items });

  return (
    <div className="cart-component">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartRow key={item.id.itemId} cartItem={item} items={items} dispatch={dispatch} />
              ))}
            </tbody>
          </table>
          <div>
            Subtotal: $
            {subTotal.toFixed(2)}
          </div>
          <div>
            Tax: $
            {tax.toFixed(2)}
          </div>
          {zipCode.length === 5 ? (
            <>
              <div>
                Tax: $
                {tax.toFixed(2)}
              </div>
              <div>
                Total: $
                {total.toFixed(2)}
              </div>
            </>
          ) : (
            <div className="warning">Enter Zip Code to get total</div>
          )}
          <h2>Checkout</h2>
          <form onSubmit={submitOrder}>
            <label htmlFor="name">
              Name
              <input id="name" type="text" value={name} onChange={(event) => onNameChange(event.target.value)} required />
            </label>
            <label htmlFor="phone">
              Phone Number
              <input id="phone" type="tel" value={phone} onChange={(event) => setFormattedPhone(event.target.value)} aria-label="Enter your phone number. After a phone number is entered, you will automatically be moved to the next field." />
            </label>
            <label htmlFor="zipcode" value={zipCode} onChange={(event) => setZipCode(event.target.value)}>
              Zip Code
              <input id="zipcode" type="text" maxLength="5" inputMode="numeric" required ref={zipRef} />
            </label>
            <button type="submit" disabled={!isFormValid}>
              Order Now
            </button>
          </form>
        </>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: { itemId: PropTypes.string.isRequired },
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Cart;
