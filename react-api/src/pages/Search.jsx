import React, { useEffect, useState } from "react";
import Axios from "axios";

function Search() {
  const [allData, setAllData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  const searchFilter = allData.filter((event) => {
    const inputSearch = inputValue.toLowerCase();

    return (
      event.summary.toLowerCase().includes(inputValue) ||
      event.location.name.toLowerCase().includes(inputValue) ||
      event.datetime.toLowerCase().includes(inputValue)
    );
  });

  useEffect(() => {
    Axios.get("https://polisen.se/api/events", {
      timeout: 5000,
    }).then((response) => {
      if (response.data.length > 0) {
        setAllData(response.data);
        // console.log(response.data);
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
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValue}
          placeholder="...Plats, tid, beskrivning"
        />
        <button type="submit" className="src-btn">
          Sök
        </button>
      </form>
      <div className="search-result">
        {inputValue && searchFilter.length > 0 ? (
          <ul>
            {searchFilter.map((event) => (
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
        ) : inputValue ? (
          <p>Inga sökresultat hittades</p>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
