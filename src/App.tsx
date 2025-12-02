import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import ItemDetails from "../src/pages/item-details";
import { GamesPage } from "../src/pages/games";
import GameOptions from "../src/pages/game-options";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/games" />}/>
      <Route path="/games" element={<GamesPage />} />

      <Route path="/item-details" element={<ItemDetails />} />

      <Route path="/gameOptions/:gameId" element={<GameOptions />} /> 

      </Routes>
    </Router>
  )
}

export default App
