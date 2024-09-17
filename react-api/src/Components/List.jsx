import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

const dateTimeFormat = (datetime) => {
  const date = new Date(datetime);

  const dateFormat = { year: "numeric", month: "2-digit", day: "2-digit" };
  const timeFormat = { hour: "2-digit", minute: "2-digit", hour12: false };

  const formattedDate = date.toLocaleDateString("sv-SE", dateFormat); // YYYY-MM-DD
  const formattedTime = date.toLocaleTimeString("sv-SE", timeFormat);

  return `${formattedDate} ${formattedTime}`;
};

function List() {
  const [allData, setAllData] = useState([]);
  const [showMore, setShowMore] = useState(8);
  const scrollEndRef = useRef(null);

  const handleShowMore = () => {
    setShowMore((prevCount) => prevCount + 4);

    setTimeout(() => {
      const tableContainer = scrollEndRef.current?.parentNode;
      if (tableContainer) {
        tableContainer.scrollTop = tableContainer.scrollHeight;
      }
    }, 150);
  };

  useEffect(() => {
    Axios.get("https://polisen.se/api/events", {
      timeout: 5000,
    }).then((response) => {
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
      <div className="list-section">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>PLATS</th>
                <th>BESKRIVNING</th>
                <th>TID</th>
              </tr>
            </thead>
            <tbody>
              {allData.slice(0, showMore).map((event) => (
                <tr key={event.id}>
                  <td>{event.location.name}</td>
                  <td>{event.summary}</td>
                  <td>{dateTimeFormat(event.datetime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={scrollEndRef}></div>
          <button onClick={handleShowMore} className="show-more-btn">
            Visa mer
          </button>
        </div>
      </div>
    </>
  );
}

export default List;
