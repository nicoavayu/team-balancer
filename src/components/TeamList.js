import React from 'react';

function TeamList({ teams, calculateTeamScore }) {
  return (
    <div className="team-container">
      {teams.map((team, index) => (
        <div key={index} className="team-list">
          <h2>Equipo {index + 1}</h2>
          <ul>
            {team.map((player, idx) => (
              <li key={idx}>{player.name}</li>
            ))}
          </ul>
          <p className="team-score">{calculateTeamScore(team)}</p>
        </div>
      ))}
    </div>
  );
}

export default TeamList;
