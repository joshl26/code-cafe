import './App.css';
import Header from './components/Header';
import Thumbnail from './components/Thumbnail';
import { items, itemImages } from './items';

function App() {
  return (
    <div className="App">
      <Header />
      {items.map((item) => (
        <Thumbnail key={item.itemId} image={itemImages[item.itemId]} title={item.title} />
      ))}
    </div>
  );
}

export default App;
