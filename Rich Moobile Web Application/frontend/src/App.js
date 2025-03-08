import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails'
import BackCovers from './pages/BackCovers'
import ComputerItems from './pages/ComputerItems'
import HeadPhones from './pages/HeadPhones'
import Other from './pages/Other'
import PhoneCharges from './pages/PhoneCharges'
import SmartPhones from './pages/SmartPhones'
import Speakers from './pages/Speakers'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/backcovers" element={<BackCovers />} />
      <Route path="/computeritems" element={<ComputerItems />} />
      <Route path="/headphones" element={<HeadPhones />} />
      <Route path="/other" element={<Other />} />
      <Route path="/phonecharges" element={<PhoneCharges />} />
      <Route path="/smartphones" element={<SmartPhones />} />
      <Route path="/speakers" element={<Speakers />} />
      <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
        
  );
}

export default App;
