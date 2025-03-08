import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Products from './pages/ProductsManagement'
import Orders from './pages/OrdersManagement'
import Inventory from './pages/InventoryManagement'
import Users from './pages/UsersManagement'
import Settings from './pages/Settings'
import Add from './pages/AddProduct'
import Update from './pages/UpdateProduct'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/update/:id' element={<Update/>}/>
    </Routes>
  );
}

export default App;
