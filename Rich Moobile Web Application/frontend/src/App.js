import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import Dashboard from './pages/admin/Dashboard';
import ItemDetails from './pages/customer/ItemDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
        
  );
}

export default App;
