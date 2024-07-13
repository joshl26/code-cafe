/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Details from './components/Details';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/details" element={<Details items={items} />}>
          <Route path=":id" element={<div><p>Detail Items</p></div>} />
        </Route>
        <Route path="/" element={<Home items={items} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
