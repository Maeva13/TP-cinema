import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useParams } from 'react-router-dom';


function Home() {
  return (
    <div>
      <h1>Bienvenue sur l'application de films</h1>
      <p>Ici, vous pouvez trouver des informations sur les films que vous aimez et en découvrir de nouveaux.</p>
    </div>
  );
} 


function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5000/api/films');
      setFilms(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <Link to={`/films/${film.titre}`}>
              <p>{film.titre}</p>
            </Link>  
              <img src={film.image}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilmDetail() {
  const { titre } = useParams();
  const [film, setFilm] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/api/films/${titre}`);
        if (response.data) {
          setFilm(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [titre]);
  
  return (
    <div>
      <h1>Film</h1>
      <h2>{titre}</h2>
      <p>Realisateur : {film.realisateur}</p>
      <p>Acteurs : {film.acteurs}</p>
      <p>Description : {film.description}</p>
      <img src={film.image}/>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/films">Films</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/films" exact element={<Films />} />
        <Route path="/films/:titre" element={<FilmDetail />} />
      </Routes>
      <footer>
        
      </footer>
    </div>
  );
}



export default App;
