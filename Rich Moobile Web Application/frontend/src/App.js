import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails'
import BackCovers from './pages/BackCovers'
import ComputerItems from './pages/ComputerItems'
import HeadPhones from './pages/HeadPhones'
import PhoneCharges from './pages/PhoneCharges'
import SmartPhones from './pages/SmartPhones'
import Speakers from './pages/Speakers'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Feedback from './pages/Feedback'
import SearchResult from './pages/SearchResult'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/backcovers" element={<BackCovers />} />
      <Route path="/computeritems" element={<ComputerItems />} />
      <Route path="/headphones" element={<HeadPhones />} />
      <Route path="/phonecharges" element={<PhoneCharges />} />
      <Route path="/smartphones" element={<SmartPhones />} />
      <Route path="/speakers" element={<Speakers />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/searchresult" element={<SearchResult />} />
      <Route path="/item/:id" element={<ItemDetails />} />
    </Routes>
        
  );
}

export default App;
