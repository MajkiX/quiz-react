import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import QuizPage from './QuizPage';
import MainPage from './MainPage';

const Main = () => {
    const [categoryArray, setCategoryArray] = useState([])
    const API_URL_categories = 'https://opentdb.com/api_category.php'

    const fechCategory = async () => {
        const result = await axios(API_URL_categories)
        setCategoryArray(result.data.trivia_categories);
    }

    fechCategory()

    return (
        <Routes>
            <Route path="/*" element={<MainPage />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/QuizPage" element={<QuizPage categoryArray={categoryArray} />} />
        </Routes>
    );
}

export default Main;