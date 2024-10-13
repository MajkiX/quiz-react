import React from 'react';
import { Routes, Route } from 'react-router-dom';

import QuizPage from './QuizPage';
import MainPage from './MainPage';

const Main = () => {
    return (
        <Routes>
            <Route path="/*" element={<MainPage />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/QuizPage" element={<QuizPage />} />
        </Routes>
    );
}

export default Main;