import { useEffect, useState } from "react";

function BandList() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/bands")
      .then((response) => response.json())
      .then((data) => {
        setBands(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <ul>
      {bands.map((band) => (
        <li key={band.id}>{band.name}</li>
      ))}
    </ul>
  );
}

export default BandList;
