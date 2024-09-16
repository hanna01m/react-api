import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

function List() {
  const [allData, setAllData] = useState([]);
  const [showMore, setShowMore] = useState(10);
  const scrollEndRef = useRef(null);

  const handleShowMore = () => {
    setShowMore((prevCount) => prevCount + 5);

    setTimeout(() => {
      scrollEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 150);
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
                  <td>{event.datetime}</td>
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
