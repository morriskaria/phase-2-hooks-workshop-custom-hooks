// src/exercise/02.js
import { useState, useEffect } from 'react';

export function usePokemon(query) {
  const [state, setState] = useState({
    data: null,
    errors: null,
    status: "pending"
  });

  useEffect(() => {
    if (!query) return;

    setState({ data: null, errors: null, status: "pending" });

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(r => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Not found");
      })
      .then(data => setState({ 
        data, 
        errors: null, 
        status: "fulfilled" 
      }))
      .catch(err => setState({ 
        data: null, 
        errors: [err.message], 
        status: "rejected" 
      }));
  }, [query]);

  return state;
}