import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

const App = () => {
  return ( 
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={ <Portfolio /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>

    </BrowserRouter>
   );
}
 
export default App;