import React, { useEffect, useState } from "react";
import Axios from "axios";

function Search() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    Axios.get("https://polisen.se/api/events", {
      timeout: 5000,
    }).then((response) => {
      if (response.data.length > 0) {
        allData(response.data);
        console.log(response.data);
      } else {
        console.log("Ingen data hittades");
      }
    });
  }, []);
  return (
    <div className="search">
      <h1>Sökfält</h1>
      <form>
        {" "}
        <input type="text"></input>
        <button className="src-btn">Sök</button>
      </form>
      <div className="search-result">
        <ul>
          {allData.map((event) => (
            <li key={event.id}>
              <p>
                <strong>Plats: </strong>
                {event.location.name}{" "}
              </p>
              <p>
                <strong>Beskrivning: </strong>
                {event.summary}{" "}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
