/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ItemType from '../types/item';
import './Orders.css';

// eslint-disable-next-line no-unused-vars
function Orders({ items }) {
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then((result) => setOrders(result.data));
  }, []);

  return (
    <div className="orders-component">
      <h2>Existing Orders</h2>
    </div>
  );
}

Orders.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Orders;
