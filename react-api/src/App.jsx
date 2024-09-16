import { useEffect, useState } from "react";
import "./List.css";
import "./Map.css";
import "./App.css";
import "./Header.css";

import List from "./Components/List";
import Map from "./Components/Map";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <List />
        <Map />
      </div>
    </>
  );
}

export default App;
