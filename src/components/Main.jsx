import React from 'react';
import { Routes, Route } from 'react-router-dom';


import EasyQuizPage from './EasyQuizPage';
import MediumQuizPage from './MediumQuizPage';
import HardQuizPage from './HardQuizPage';
import ResultPage from './ResultPage';
import MainPage from './MainPage';

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/EasyQuizPage" element={<EasyQuizPage />} />
            <Route path="/MediumQuizPage" element={<MediumQuizPage />} />
            <Route path="/HardQuizPage" element={<HardQuizPage />} />
            <Route path="/ResultPage" element={<ResultPage />} />
        </Routes>
    );
}

export default Main;