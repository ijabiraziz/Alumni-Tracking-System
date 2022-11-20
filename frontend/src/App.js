import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';



function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/login"  element={<LoginScreen />} />
            <Route path="/register"  element={<RegisterScreen />} />
            <Route path="/dashboard" element={<HomeScreen/>} />

            {/* <Route path="/e" element={<Employees />} /> */}

            {/*  I am passing id as a param */}
            {/* <Route path="/product/:id" element={<ProductScreen />} /> */}

            {/* <Route path="/cart/" element={<CartScreen />} >
              <Route path=":params" element={<CartScreen />} />
            </Route> */}

          </Routes>
    </Router>
  );
}

export default App;
