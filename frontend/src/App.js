import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ReportScreen from "./screens/ReportScreen";
import AllAlumniScreen from "./screens/AllAlumniScreen";
import BSAlumniScreen from "./screens/BSAlumniScreen";
import MSAlumniScreen from "./screens/MSAlumniScreen";
import PHDAlumniScreen from "./screens/PHDAlumniScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LogoutScreen from "./screens/LogoutScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddAlumniScreen from './screens/AddAlumniScreen';


function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/login"  element={<LoginScreen />} />
            <Route path="/register"  element={<RegisterScreen />} />
            <Route path="/dashboard" element={<HomeScreen/>} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/reports" element={<ReportScreen />} />
            <Route path="/all" element={<AllAlumniScreen />} />
            <Route path="/bs" element={<BSAlumniScreen />} />
            <Route path="/ms" element={<MSAlumniScreen />} />
            <Route path="/phd" element={<PHDAlumniScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/addAlumni" element={<AddAlumniScreen />} />

            {/*  I am passing id as a param */}
            {/* <Route path="/product/:id" element={<ProductScreen />} /> */}

            {/* <Route path="/cart/" element={<CartScreen />} >
              <Route path=":params" element={<CartScreen />} />
            </Route> */}
            <Route path="/logout" element={<LogoutScreen />} />
          </Routes>
    </Router>
  );
}

export default App;
