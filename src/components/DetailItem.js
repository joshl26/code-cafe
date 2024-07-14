/* eslint-disable import/no-extraneous-dependencies */
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { itemImages } from '../items';
import './DetailItem.css';
import ItemType from '../types/item';

function DetailItem({ addToCart, items }) {
  const { id } = useParams();
  const detailItem = items.find((item) => item.itemId === id);

  const addItemToCart = () => {
    addToCart({ type: PropTypes.func.isRequired, itemId: detailItem.itemId });
  };

  return (
    <div className="detail-item-component">
      {detailItem ? (
        <>
          <img className="details-image" src={itemImages[detailItem.imageId]} alt={detailItem} />
          <h2>{detailItem.title}</h2>
          {!!detailItem.description && <h6>{detailItem.description}</h6>}
          <div>
            $
            {(detailItem.salePrice ?? detailItem.price).toFixed(2)}
          </div>
          <button type="button" onClick={addItemToCart}>Add to Cart</button>
        </>
      ) : <h2>Unknown Item</h2>}
    </div>
  );
}

DetailItem.propTypes = {
  addToCart: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default DetailItem;
