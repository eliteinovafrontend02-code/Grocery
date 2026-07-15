import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home'
import Header from './Header'
import FreshProducts from './Components/pages/FreshProducts';
import Cart from './Cart';
import Checkout from './Checkout';
import KitchenEssentials from './Components/pages/KitchenEssentials';
import SpicesAndDryFruits from './Components/pages/SpicesAndDryFruits';
import DairyProductsAndSnacks from './Components/pages/DairyProductsAndSnacks';
import About from './About';

const App = () => {
  return (
    <div>

      <BrowserRouter>

      <Header/>

       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/checkout" element={<Checkout/>} />

        <Route path="/fresh-products" element={<FreshProducts/>} />
        <Route path="/kitchen-essentials" element={<KitchenEssentials/>} />
        <Route path="/spices-dry-fruits" element={<SpicesAndDryFruits/>} />
        <Route path="/dairy-snacks" element={<DairyProductsAndSnacks/>} />

       </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
