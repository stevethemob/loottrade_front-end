import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import ItemDetails from "../src/pages/item-details";
import { GamesPage } from "../src/pages/games";
import GameOptions from "../src/pages/game-options";
import Inventory from "../src/pages/inventory";
import AllItems from "../src/pages/items";
import Login from "../src/pages/login";
import Register from "../src/pages/register";
import AllOffers from "../src/pages/all-offers";
import AddOffer from "../src/pages/add-offer";
import TradeInventory from "../src/pages/trade-items";
import AllTrades from "../src/pages/all-trades";
import TradeDetail from "./pages/trade-details";
import OwnOffers from "../src/pages/own-offers";
import OfferDetails from "./pages/offer-details";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/games" element={<GamesPage />} />

        <Route path="/item-details" element={<ItemDetails />} />

        <Route path="/gameOptions/:gameId" element={<GameOptions />} />

        <Route path="/inventory/:gameId" element={<Inventory />} />

        <Route path="/items/:gameId" element={<AllItems />} />

        <Route path="/offers/:gameId" element={<AllOffers />} />

        <Route path="/addOffer/:gameId" element={<AddOffer />} />

        <Route path="/tradeitems/:offerId" element={<TradeInventory />} />

        <Route path="/allTrades/:gameId" element={<AllTrades />} />

        <Route path="/tradeDetails/:tradeId" element={<TradeDetail />} />

        <Route path="/ownOffers/:gameId" element={<OwnOffers />} />

        <Route path="/offerDetails/:offerId" element={<OfferDetails />} />
      </Routes>
    </Router>
  )
}

export default App
