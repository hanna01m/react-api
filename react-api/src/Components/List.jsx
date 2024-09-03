import React, { useState, useEffect } from "react";
import Axios from "axios";

function List() {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    Axios.get("https://polisen.se/api/events").then((response) => {
      if (response.data.length > 0) {
        setAllData(response.data);
        console.log(response.data);
      } else {
        console.log("Ingen data hittades");
      }
    });
  }, []);

  return (
    <div className="list-container">
      {allData.length > 0 ? (
        allData.map((event) => (
          <div key={event.id}>
            <p>Beskrivning: {event.summary}</p>
          </div>
        ))
      ) : (
        <p>Laddar data...</p>
      )}
    </div>
  );
}

export default List;
