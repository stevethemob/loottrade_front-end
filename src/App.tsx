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
import AddGame from "../src/pages/add-game";
import GameOptionsAdmin from "./pages/game-options-admin";
import EditGame from "../src/pages/edit-game";
import AllTradesAdmin from "../src/pages/all-trades-admin";
import AllItemsAdmin from "./pages/all-items-admin";
import EditItem from "./pages/edit-item";
import AddItem from "./pages/add-item";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/games" element={<GamesPage />} />

        <Route path="/item/:gameId/:itemId" element={<ItemDetails />} />

        <Route path="/gameOptions/:gameId" element={<GameOptions />} />

        <Route path="/inventory/:gameId" element={<Inventory />} />

        <Route path="/items/:gameId" element={<AllItems />} />

        <Route path="/offers/:gameId" element={<AllOffers />} />

        <Route path="/addOffer/:gameId" element={<AddOffer />} />

        <Route path="/tradeitems/:gameId/:offerId" element={<TradeInventory />} />

        <Route path="/allTrades/:gameId" element={<AllTrades />} />

        <Route path="/tradeDetails/:gameId/:tradeId" element={<TradeDetail />} />

        <Route path="/ownOffers/:gameId" element={<OwnOffers />} />

        <Route path="/offerDetails/:gameId/:offerId" element={<OfferDetails />} />

        <Route path="/addGame" element={<AddGame />} />

        <Route path="/gameOptionsAdmin/:gameId" element={<GameOptionsAdmin />} />

        <Route path="/editGame/:gameId" element={<EditGame />} />

        <Route path="/allTradesAdmin/:gameId" element={<AllTradesAdmin />} />

        <Route path="/AllItemsAdmin/:gameId" element={<AllItemsAdmin />} />

        <Route path="/editItem/:gameId/:itemId" element={<EditItem />} />

        <Route path="/addItem/:gameId" element={<AddItem />} />
      </Routes>
    </Router>
  )
}

export default App
