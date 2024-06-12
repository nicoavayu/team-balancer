import React, { useState } from 'react';

function PlayerForm({ onAddPlayer }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleScoreChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setScore(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || score === '') return;
    onAddPlayer({ name, score });
    setName('');
    setScore('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={handleNameChange} required />
      </label>
      <label>
        Puntaje (1-10):
        <input type="number" min="1" max="10" value={score} onChange={handleScoreChange} required />
      </label>
      <button type="submit">Agregar Jugador</button>
    </form>
  );
}

export default PlayerForm;
