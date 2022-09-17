import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReportScreen from "./screens/ReportScreen";
import AllAlumniScreen from "./screens/AllAlumniScreen";
import BSAlumniScreen from "./screens/BSAlumniScreen";
import MSAlumniScreen from "./screens/MSAlumniScreen";
import PHDAlumniScreen from "./screens/PHDAlumniScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LogoutScreen from "./screens/LogoutScreen";


function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/dashboard" element={<HomeScreen/>} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/reports" element={<ReportScreen />} />
            <Route path="/all" element={<AllAlumniScreen />} />
            <Route path="/bs" element={<BSAlumniScreen />} />
            <Route path="/ms" element={<MSAlumniScreen />} />
            <Route path="/phd" element={<PHDAlumniScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />

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
