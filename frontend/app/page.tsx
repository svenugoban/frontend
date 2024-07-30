"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [joke, setJoke] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetch("/api/jokes/types")
      .then((res) => res.json())
      .then((data) => setTypes(data));
  }, []);

  const getJoke = () => {
    fetch(`/api/jokes?type=${selectedType}`)
      .then((res) => res.json())
      .then((data) => setJoke(data));
  };

  return (
    <div>
      <h1>Joke Generator</h1>
      <select onChange={(e) => setSelectedType(e.target.value)}>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button onClick={getJoke}>Get Joke</button>
      <p>{joke}</p>
    </div>
  );
}
