import React from 'react';
import bemCssModules from 'bem-css-modules'
import { default as MainPageStyle } from './styleModules/MainPage.module.scss'

const style = bemCssModules(MainPageStyle)

const MainPage = () => {
    return (
        <div className={style()}>
            <h1>Welcome to Quiz</h1>
            <h2>this is a small project created to practice working with React</h2>
            <h2>If you want to play, select the difficulty level</h2>
            <h2>
                the game consists of 10 questions, after answering them your result will be displayed</h2>
        </div>
    );
}

export default MainPage;