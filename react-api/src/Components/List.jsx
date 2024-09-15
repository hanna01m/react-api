import React, { useState, useEffect } from "react";
import Axios from "axios";

function List() {
  const [allData, setAllData] = useState([]);
  const [showMore, setShowMore] = useState(10);

  const handleShowMore = () => {
    setShowMore((prevCount) => prevCount + 5);
  };

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
    <>
      <div className="page-container">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Plats</th>
                <th>Beskrivning</th>
                <th>Tid</th>
              </tr>
            </thead>
            <tbody>
              {allData.slice(0, showMore).map((event) => (
                <tr key={event.id}>
                  <td>{event.location.name}</td>
                  <td>{event.summary}</td>
                  <td>{event.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleShowMore}>Visa mer</button>
        </div>
      </div>
    </>
  );
}

export default List;
