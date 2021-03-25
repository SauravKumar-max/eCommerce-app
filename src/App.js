import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      axios.get("/api/products").then((response) => {
        setData(response.data.products);
      });
    })();
  }, []);

  return (
    <div className="App">
      <h1> Data </h1>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
