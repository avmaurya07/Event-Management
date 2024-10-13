import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Event from './Components/Event';
import Register from './Components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;