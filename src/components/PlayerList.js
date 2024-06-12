import React from 'react';

function PlayerList({ players, onSelectPlayer, onDeletePlayer, selectedPlayers, maxSelectionReached }) {
  return (
    <div className="player-list">
      <ul>
        {players.map((player, index) => (
          <li
            key={index}
            onClick={() => !maxSelectionReached || selectedPlayers.includes(player) ? onSelectPlayer(player) : null}
            className={`player-item ${selectedPlayers.includes(player) ? 'selected' : ''} ${maxSelectionReached && !selectedPlayers.includes(player) ? 'disabled' : ''}`}
          >
            <span>{player.name} - <span className="player-score">{player.score}</span></span>
            <button onClick={(e) => { e.stopPropagation(); onDeletePlayer(player); }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;
