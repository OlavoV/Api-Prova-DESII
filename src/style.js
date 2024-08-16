import styled from 'styled-components';

// Container principal da aplicação
export const AppContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
`;

// Cabeçalho da aplicação
export const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  border-radius: 5px;
`;

// Main da aplicação
export const Main = styled.main`
  margin-top: 20px;
`;

// Título
export const Title = styled.h1`
  font-size: 1.5rem;
  color: #282c34;
`;

// Lista de partidas
export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

// Item da lista de partidas
export const ListItem = styled.li`
  background-color: white;
  border: 1px solid #ddd;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f0f0f0;
  }
`;

// Input de pesquisa
export const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;
`;

// Botão de pesquisa
export const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Componente de bandeira
export const Flag = styled.img`
  width: 30px;
  height: auto;
  margin-right: 5px;
  vertical-align: middle;
`;

// Container para informações dos times
export const TeamsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
`;

// Container para o placar
export const ScoreContainer = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  width: 20%;
  text-align: center;
`;
