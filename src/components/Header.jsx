import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'
import { default as HeaderStyle } from './styleModules/Header.module.scss'

const style = bemCssModules(HeaderStyle)


const Header = () => {

    return (
        <div className={style()}>
            <Link to='/QuizPage' state={{ difficulty: "easy" }}>
                <button className={style("buttons")}>Easy</button>
            </Link>
            <Link to='/QuizPage' state={{ difficulty: "medium" }}>
                <button className={style("buttons")}>Medium</button>
            </Link>
            <Link to='/QuizPage' state={{ difficulty: "hard" }}>
                <button className={style("buttons")}>Hard</button>
            </Link>
        </div>
    );
}

export default Header;