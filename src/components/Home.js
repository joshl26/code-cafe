// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import './Home.css';

function Home({ items }) {
  return (
    <div className="home-component">
      {items.map((item) => (
        <Thumbnail key={item.itemId} image={itemImages[item.itemId]} title={item.title} />
      ))}
    </div>
  );
}

Home.propTypes = {
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

export default Home;
