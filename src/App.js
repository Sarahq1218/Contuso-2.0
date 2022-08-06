import React from 'react'
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components'
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);

  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
    window.location.reload(false)
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {

    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
    window.location.reload(false)
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
    window.location.reload(false)
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
    window.location.reload(false)
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }
  const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);

  }

  useEffect(() => {
    fetchProducts();
    fetchCart();

  }, []);

  console.log(cart);


  return (
    <BrowserRouter>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path='/'
            element={<Products products={products} onAddToCart={handleAddToCart} />} />

          <Route exact path='cart'
            element={<Cart cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleEmptyCart={handleEmptyCart}
              handleRemoveFromCart={handleRemoveFromCart} />} />
          <Route exact path='/checkout'
            element={<Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App