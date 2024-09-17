import React, { useState, useEffect, useRef } from "react";
import dateTimeFormat from "../utils/dateTimeFormat";
import { apiUrl } from "../utils/api";

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
    const fetchData = async () => {
      const reportsData = await apiUrl();
      setAllData(reportsData);
    };

    fetchData();
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
        <p className="search-link">
          För detaljerad sökning klicka <a href="/search">här</a>
        </p>
      </div>
    </>
  );
}

export default List;
