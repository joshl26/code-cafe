/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import {
  useEffect, useState, useReducer, useMemo,
} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Details from './components/Details';
import DetailItem from './components/DetailItem';
import Cart from './components/Cart';
import { cartReducer, CartTypes, initialCartState } from './reducers/cartReducer';
import CurrentUserContext from './contexts/CurrentUserContext';
import Login from './components/Login';

const storageKey = 'cart';

function App() {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [cart, dispatch] = useReducer(cartReducer, initialCartState, (initialState) => {
    try {
      const storedCart = JSON.parse(localStorage.getItem(storageKey));
      return storedCart || initialState;
    } catch (error) {
      console.log(error);
      return initialState;
    }
  });

  const addToCart = (itemId) => dispatch({ type: CartTypes.ADD, itemId });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    axios.get('/api/items')
      .then((result) => setItems(result.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios.get('/api/auth/current-user')
      .then((result) => setCurrentUser(result.data))
      .catch(console.error);
  }, []);

  const currentUserContextValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return (
    <Router>
      <CurrentUserContext.Provider value={currentUserContextValue}>
        <Header cart={cart} />
        {items.length === 0
          ? <div>Loading...</div>
          : (
            <Routes>
              <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} items={items} />} />
              <Route path="/details" element={<Details items={items} />}>
                <Route path=":id" element={<DetailItem items={items} addToCart={addToCart} />} />
                <Route index element={<div>No Element Selected</div>} />
              </Route>
              <Route path="/" element={<Home items={items} />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
