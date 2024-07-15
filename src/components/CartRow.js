import PropTypes from 'prop-types';
import ItemType from '../types/item';

function CartRow({ cartItem, items }) {
  // console.log({ cartItem });
  // console.log(items);

  const item = items.find((i) => i.itemId === cartItem.id.itemId);

  // console.log(item);

  return (
    <tr>
      <td>{cartItem.quantity}</td>
      <td>{item.title}</td>
      <td>
        $
        {((item.salePrice ?? item.price) * cartItem.quantity).toFixed(2)}
      </td>
    </tr>
  );
}

CartRow.propTypes = {
  cartItem: PropTypes.shape({
    id: { itemId: PropTypes.string.isRequired },
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default CartRow;
