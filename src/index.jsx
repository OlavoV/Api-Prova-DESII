import React, { useState, useEffect } from 'react';
import { AppContainer, Header, Main, Title, List, ListItem, SearchInput, SearchButton, Flag, TeamsContainer, ScoreContainer } from './style';

const MatchesComponent = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetch('/worldcup.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const allMatches = data.rounds.flatMap(round => round.matches.map(match => ({ ...match, roundName: round.name })));
        setMatches(allMatches);
        setFilteredMatches(allMatches.slice(0, 70)); // Exibe apenas os três primeiros jogos
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = matches.filter(match =>
      match.team1.name.toLowerCase().includes(lowercasedSearchTerm) ||
      match.team2.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredMatches(filtered);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const getFlagUrl = (code) => `https://flagcdn.com/w320/${code.toLowerCase()}.png`;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Title>Partidas</Title>
      <div>
        <SearchInput
          type="text"
          placeholder="Procure por um time..."
          value={searchTerm}
          onChange={handleChange}
        />
        <SearchButton onClick={handleSearch}>Buscar</SearchButton>
      </div>
      {filteredMatches.map((match, index) => (
        <div key={index}>
          {(index === 0 || filteredMatches[index - 1].roundName !== match.roundName) && (
            <h3>{match.roundName}</h3>
          )}
          <ListItem onClick={() => handleMatchClick(match)}>
            <TeamsContainer>
              <Flag src={getFlagUrl(match.team1.code)} alt={match.team1.name} />
              <span>{match.team1.name}</span>
            </TeamsContainer>
            <ScoreContainer>{match.score1} x {match.score2}</ScoreContainer>
            <TeamsContainer>
              <span>{match.team2.name}</span>
              <Flag src={getFlagUrl(match.team2.code)} alt={match.team2.name} />
            </TeamsContainer>
          </ListItem>
        </div>
      ))}
      {selectedMatch && (
        <div>
          <h2>{selectedMatch.team1.name} vs {selectedMatch.team2.name}</h2>
          <p>Data: {selectedMatch.date}</p>
          <p>Horário: {selectedMatch.time}</p>
          <p>Estádio: {selectedMatch.stadium.name}</p>
          <p>Cidade: {selectedMatch.city}</p>
          <p>Grupo: {selectedMatch.group}</p>
          <p>Gols do {selectedMatch.team1.name}:</p>
          <ul>
            {selectedMatch.goals1.map((goal, idx) => (
              <li key={idx}>{goal.name} - {goal.minute}'</li>
            ))}
          </ul>
          <p>Gols do {selectedMatch.team2.name}:</p>
          <ul>
            {selectedMatch.goals2.map((goal, idx) => (
              <li key={idx}>{goal.name} - {goal.minute}'</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AppContainer>
      <Header>
        <h1>Copa de 2018</h1>
      </Header>
      <Main>
        <MatchesComponent />
      </Main>
    </AppContainer>
  );
};

export default App;