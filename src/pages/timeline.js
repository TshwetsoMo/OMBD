import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './timeline.css';

const Timeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState('');

  const fetchData = async (searchTerm) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&apikey=4932ab16`);
      if (response.data.Search) {
        setMovieData(response.data.Search);
        setSearchedMovie(searchTerm);
      } else {
        setMovieData([]);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const generateChartData = (movieData, searchedMovie) => {
    if (!movieData) return null;

    const years = [];
    const posters = [];
    movieData.forEach((movie) => {
      if (movie.Year && movie.Poster) {
        years.push(movie.Year);
        posters.push(movie.Poster);
      }
    });

    return {
      labels: years,
      datasets: [
        {
          label: searchedMovie, // Use searched movie as the label
          data: years.map((year, index) => ({
            x: year,
            y: index + 1,
            poster: posters[index],
          })),
          pointRadius: 8,
          pointHoverRadius: 12,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    };
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 1990, // Set the minimum year
        max: new Date().getFullYear(), // Set the current year as the maximum
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
  };

  return (
    <div className="timeline-page">
      <h1 style={{ color: 'white' }}>Timeline</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-icon" onClick={() => fetchData(searchTerm)}>
        </button>
      </div>
      <div className="timeline-chart">
        <Line data={generateChartData(movieData, searchedMovie)} options={options} />
      </div>
    </div>
  );
};

export default Timeline;
