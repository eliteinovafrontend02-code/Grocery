import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home'
import Header from './Header'

const App = () => {
  return (
    <div>

      <BrowserRouter>

      <Header/>

       <Routes>
        <Route path="/" element={<Home/>} />
       </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
