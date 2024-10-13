import React from 'react';
import bemCssModules from 'bem-css-modules'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { default as ResultPageStyle } from './styleModules/ResultPage.module.scss'

const style = bemCssModules(ResultPageStyle)

const ResultPage = (props) => {
    const { points, resetValues, answerArray } = props

    const resultBoxes = answerArray.map((el, index) => {
        if (el.isCorrect) {
            return (
                <div key={index} className={style('result-box-true')}>{index + 1}</div>
            )
        } else {
            return (
                <div key={index} className={style('result-box-false')}>{index + 1}</div>
            )
        }
    })

    return (
        <div className={style()}>
            <h1>Your Results:</h1>
            <h2>{points} / 10</h2>
            {points === 10 ? <h2>Congratulations</h2> : null}
            <div className={style('result-box-container')}>{resultBoxes}</div>
            <Link to="/MainPage"><button className={style("return-button")} onClick={resetValues}>Return to Main Page <FontAwesomeIcon icon={faHouse} /></button></Link>
        </div>
    );
}

export default ResultPage;