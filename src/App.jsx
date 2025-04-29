import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import ResponsiveHome from './pages/ResponsiveHome';
import Emailvariefy from './pages/Emailvariefy';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResponsiveHome />} />
        <Route path="/chat/:id" element={<ResponsiveHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/veriefy-email" element={<Emailvariefy />} />
      </Routes>
    </Router>
  );
}

export default App;   

