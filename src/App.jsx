import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResponsiveHome from "./pages/ResponsiveHome";
import Emailvariefy from "./pages/Emailvariefy";
import Layout from "./component/Home.jsx/Layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/veriefy-email" element={<Emailvariefy />} />

        <Route path="/home" element={<Layout />}>
          <Route index element={<ResponsiveHome />} />
          <Route path="chat/:id" element={<ResponsiveHome />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
