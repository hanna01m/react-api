import { useEffect, useState } from "react";
import "./List.css";
import "./Map.css";
import "./App.css";

import List from "./Components/List";
import Map from "./Components/Map";

function App() {
  return (
    <>
      <div className="App">
        <List />
        <Map />
      </div>
    </>
  );
}

export default App;
