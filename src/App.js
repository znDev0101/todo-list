import './App.css';
import { Home } from './components';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutApp from './components/AboutApp/AboutApp';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about/" element={<AboutApp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
