// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const ItemType = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      imageId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      salePrice: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ItemType;
