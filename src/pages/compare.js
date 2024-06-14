import React, { useState } from 'react';
import './compare.css';
import axios from 'axios';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import RadarChart from '../components/RadarChart';

const Compare = () => {
  const [movie1, setMovie1] = useState('');
  const [movie2, setMovie2] = useState('');
  const [movieData, setMovieData] = useState(null);

  const handleSearch = async (movie) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=4932ab16`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return null;
    }
  };

  const handleSearch1 = async () => {
    const data = await handleSearch(movie1);
    setMovieData((prevState) => ({ ...prevState, movie1: data }));
  };

  const handleSearch2 = async () => {
    const data = await handleSearch(movie2);
    setMovieData((prevState) => ({ ...prevState, movie2: data }));
  };

  return (
    <div className="background">
      <div className="movie-comparison-page">
        <div className="section1">
          <div className="search-fields">
            <input
              type="text"
              placeholder="Enter movie 1"
              value={movie1}
              onChange={(e) => setMovie1(e.target.value)}
            />
            <button className="search-icon" onClick={handleSearch1}>
            </button>
            <span className="versus">VERSUS</span>
            <input
              type="text"
              placeholder="Enter movie 2"
              value={movie2}
              onChange={(e) => setMovie2(e.target.value)}
            />
            <button className="search-icon" onClick={handleSearch2}>
            </button>
          </div>
          <p style={{ color: 'white' }}>Make sure your spelling is correct!!!</p>
        </div><br/><br/>
        <div className="section2">
          <div className="chart-container circular">
            <h2>Pie Chart</h2>
            <PieChart movieData={movieData} />
          </div>
          <div className="chart-container circular">
            <h2>Radar Chart</h2>
            <RadarChart movieData={movieData} />
          </div>
          <div className="chart-container square">
            <h2>Bar Chart</h2>
            <BarChart movieData={movieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;

