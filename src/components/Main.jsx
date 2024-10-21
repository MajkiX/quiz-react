import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import QuizPage from './QuizPage';
import MainPage from './MainPage';

const Main = () => {
    const [categoryArray, setCategoryArray] = useState([])
    const [error, setError] = useState(null);
    const API_URL_categories = 'https://opentdb.com/api_category.php'

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await axios.get(API_URL_categories);
                setCategoryArray(result.data.trivia_categories);
            } catch (error) {
                console.error('Error fetching category data:', error);
                setError('Failed to load categories. Please try again later.'); // Set error message
            }
        };
        console.log('fetch');
        fetchCategory();
    }, []);

    return (
        <>
            {error && <p>{error}</p>} {/* Display error if it occurs */}
            <Routes>
                <Route path="/*" element={<MainPage />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/QuizPage" element={<QuizPage categoryArray={categoryArray} />} />
            </Routes>
        </>
    );
}

export default Main;