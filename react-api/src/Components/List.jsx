import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

function List() {
  const [allData, setAllData] = useState([]);
  const [showMore, setShowMore] = useState(5);
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
                  <td>
                    {(() => {
                      const formattedDate = new Date(event.datetime);

                      const date = formattedDate.toLocaleDateString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      });

                      const time = formattedDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return `${date} ${time}`;
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={scrollEndRef}></div>
          <button onClick={handleShowMore}>Visa mer</button>
        </div>
      </div>
    </>
  );
}

export default List;
