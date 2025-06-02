import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResponsiveHome from "./pages/ResponsiveHome";
import Emailvariefy from "./pages/Emailvariefy";
import Layout from "./component/Home.jsx/Layout/Layout";
import ChatListLoading from "./component/Loading";
import { useEffect } from "react";
import { initSocket } from "./services/soket";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/Forgetpass";
import ResetPassword from "./pages/Resetpassword";

function App() {
  useEffect(() => {
    initSocket();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loading" element={<ChatListLoading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/veriefy-email" element={<Emailvariefy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="reset-password/:randomString"
          element={<ResetPassword />}
        />

        <Route path="/home" element={<Layout />}>
          <Route index element={<ResponsiveHome />} />
          <Route path="chat/:id" element={<ResponsiveHome />} />
          <Route path="/home/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
