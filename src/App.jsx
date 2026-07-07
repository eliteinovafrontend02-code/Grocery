import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home'
import Header from './Header'
import FreshProducts from './Components/pages/FreshProducts';

const App = () => {
  return (
    <div>

      <BrowserRouter>

      <Header/>

       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/fresh-products" element={<FreshProducts/>} />

       </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
