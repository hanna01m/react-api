import React, { useEffect, useState } from "react";
import "../Search.css";
import dateTimeFormat from "../utils/dateTimeFormat";
import { apiUrl } from "../utils/api";

function Search() {
  const [allData, setAllData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  const searchFilter = allData.filter((event) => {
    const inputSearch = inputValue.toLowerCase();

    return (
      event.summary.toLowerCase().includes(inputSearch) ||
      event.location.name.toLowerCase().includes(inputSearch) ||
      event.datetime.toLowerCase().includes(inputSearch)
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      const reportsData = await apiUrl();
      setAllData(reportsData);
    };

    fetchData();
  }, []);

  return (
    <div className="search-page">
      <form>
        <h1>Detaljerad sökning</h1>{" "}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValue}
          placeholder="...plats, tid, beskrivning..."
        />
      </form>
      <div className="search-result">
        {inputValue && searchFilter.length > 0 ? (
          <table className="search-container">
            <thead>
              <tr>
                <th>PLATS</th>
                <th>BESKRIVNING</th>
                <th>TID</th>
                <th>KATEGORI</th>
                {/* <th>URL</th> */}
              </tr>
            </thead>
            <tbody>
              {searchFilter.map((event) => (
                <tr key={event.id}>
                  <td>{event.location.name} </td>
                  <td>{event.summary} </td>
                  <td>{dateTimeFormat(event.datetime)}</td>{" "}
                  <td>{event.type} </td>
                  {/* <td>{event.url} </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : inputValue ? (
          <p className="no-result">Inga sökresultat hittades</p>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
