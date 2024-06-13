import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const MovieApp = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const[searchTerm,setSearchTerm]= useState('');

const handleSearch= useCallback(() => {

        axios.get(`https://freetestapi.com/api/v1/movies?search=${searchTerm}`)
            .then(response => {
                console.log(response.data);
                setMovies(response.data.Search || []);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching movie data. Please try again later...');
                setLoading(false);
            });
        },[searchTerm]);
useEffect(()=>{
    handleSearch();
},[handleSearch]);

return (
    <div className="movie-app">
        <header>
     <h1>Movie App</h1>
     <input type="text"
     placeholder="Search movies by title.."
    value={searchTerm}
onChange={e=> setSearchTerm(e.target.value)}
/>
<button type="button" onClick={handleSearch}>Search</button>
</header>
     {loading?(
            <p>Loading..</p>
):error?(
    <p>{error}</p>
):(
    <ul>
        {movies.map(movie => (
            <li key={movie.id}>
                <h2>{movie.title}</h2>
                <p>Year:{movie.year}</p>
                <p>Type:{movie.genre}</p>
            </li>
        ))}
    </ul>
)}
</div>
);
}
export default MovieApp;
