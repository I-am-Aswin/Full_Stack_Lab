import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return ( 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Portfolio /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   );
}
 
export default App;