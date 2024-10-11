import React from 'react';
import bemCssModules from 'bem-css-modules'
import { default as ResultPageStyle } from './styleModules/ResultPage.module.scss'
import { Link } from 'react-router-dom';
const style = bemCssModules(ResultPageStyle)

const ResultPage = (props) => {
    const { points, resetValues } = props

    return (
        <div>
            <h1>Your Results:</h1>
            <h2>{points} / 10</h2>
            {points === 10 ? <h2>Congratulations</h2> : null}
            <Link to="/MainPage"><button onClick={resetValues}>Return to Main Page</button></Link>
        </div>
    );
}

export default ResultPage;