import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import TeamList from './components/TeamList';
import './styles.css';
import { FaUser, FaTrashAlt } from 'react-icons/fa';

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  const selectPlayer = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
      setWarningMessage('');
    } else {
      if (selectedPlayers.length >= 10) {
        setWarningMessage('Solo se pueden seleccionar 10 jugadores');
      } else {
        setSelectedPlayers([...selectedPlayers, player]);
        setWarningMessage('');
      }
    }
  };

  const deletePlayer = (player) => {
    setPlayers(players.filter((p) => p !== player));
    setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
  };

  const deleteAllPlayers = () => {
    setPlayers([]);
    setSelectedPlayers([]);
    setTeams([]);
    setWarningMessage('');
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleTeams = () => {
    const shuffledPlayers = shuffleArray(selectedPlayers);
    const newTeams = generateBalancedTeams(shuffledPlayers);
    setTeams(newTeams);
  };

  const generateBalancedTeams = (selectedPlayers) => {
    const sortedPlayers = [...selectedPlayers].sort((a, b) => b.score - a.score);
    const team1 = [];
    const team2 = [];
    let team1Score = 0;
    let team2Score = 0;

    for (let player of sortedPlayers) {
      if (team1.length < 5 && (team1Score <= team2Score || team2.length >= 5)) {
        team1.push(player);
        team1Score += player.score;
      } else if (team2.length < 5) {
        team2.push(player);
        team2Score += player.score;
      }
    }

    return [team1, team2];
  };

  const calculateTeamScore = (team) => {
    return team.reduce((total, player) => total + player.score, 0);
  };

  const generateRandomPlayers = () => {
    const randomPlayers = [];
    const names = ['John', 'Jane', 'Mike', 'Anna', 'Chris', 'Katie', 'Paul', 'Laura', 'Tom', 'Linda', 'Sarah', 'David', 'Emily', 'James', 'Jessica'];

    for (let i = 0; i < 15; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const score = Math.floor(Math.random() * 10) + 1;
      randomPlayers.push({ name: `${name}`, score });
    }

    setPlayers(randomPlayers);
  };

  return (
    <div className="container">
      <h1 className="title">Team Balancer</h1>
      <div className="content">
        <div className="player-form">
          <PlayerForm onAddPlayer={addPlayer} />
        </div>
        <div className="player-list">
          <PlayerList
            players={players}
            onSelectPlayer={selectPlayer}
            onDeletePlayer={deletePlayer}
            selectedPlayers={selectedPlayers}
            maxSelectionReached={selectedPlayers.length >= 10}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="generate-random-players-button" onClick={generateRandomPlayers}>
          <FaUser className="icon" /> Generar Jugadores Aleatorios
        </button>
        {selectedPlayers.length >= 10 && (
          <>
            <button className="generate-teams-button" onClick={() => setTeams(generateBalancedTeams(selectedPlayers))}>
              Generar Equipos
            </button>
            <button className="shuffle-teams-button" onClick={shuffleTeams}>
              Randomizar Equipos
            </button>
          </>
        )}
        <button className="delete-all-button" onClick={deleteAllPlayers}>
          <FaTrashAlt className="icon" />
        </button>
      </div>
      {warningMessage && <p className="warning-message">{warningMessage}</p>}
      <TeamList teams={teams} calculateTeamScore={calculateTeamScore} />
    </div>
  );
}

export default App;
