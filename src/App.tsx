import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import ItemDetails from "../src/pages/item-details";
import { GamesPage } from "../src/pages/games";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/item-details" />}/>
      <Route path="/item-details" element={<ItemDetails />} />
      <Route path="/" element={<Navigate to="/games" />}/>
      <Route path="/games" element={<GamesPage />} />

      </Routes>
    </Router>
  )
}

export default App
