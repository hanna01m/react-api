import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./List.css";
import "./Map.css";
import "./App.css";
import "./Header.css";
import List from "./Components/List";
import Map from "./Components/Map";
import Header from "./Components/Header";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <List />
                <Map />
              </>
            }
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
