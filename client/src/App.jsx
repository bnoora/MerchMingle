import './App.css'
import SideNav from './component/SideNav'
import MainPage from './pages/MainPage'
import Categories from './pages/Categories'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import CatgoryPage from './pages/CatgoryPage'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {

  return (
    <div id='main' className='flex flex-row justify-between items-stretch min-h-screen min-w-full bg-gray-200'>
      <Router>
        <SideNav />
        <div id='content' className="flex-grow text-center flex flex-col">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/categories" element={<Categories/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:id" element={<ProductPage/>} />
            <Route path="/categories/:id" element={<CatgoryPage/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
