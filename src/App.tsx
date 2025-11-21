import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import ItemDetails from "../src/pages/item-details"


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/item-details" />}/>
      <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
    </Router>
  )
}

export default App
