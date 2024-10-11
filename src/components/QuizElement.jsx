import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'
import { default as QuizElementStyle } from './styleModules/QuizElement.module.scss'

const style = bemCssModules(QuizElementStyle)

const QuizElement = (props) => {
    const { category, question, correct_answer, incorrect_answers, questionNumber, nextQuestion, handleCheckButton, points, answer } = props

    const tableOfAnswers = [...incorrect_answers, correct_answer]


    const answers = tableOfAnswers.map(answer => (
        <button
            className={style("answer-button")}
            key={answer}
            onClick={() => handleCheckButton(answer)}
        >
            {answer}
        </button>
    ))

    const nextButton = questionNumber < 9 ?
        <button className={style("next-button")} onClick={nextQuestion}>Next</button>
        :
        <Link to='/ResultPage' state={{ points: points }}><button onClick={nextQuestion} className={style("result-button")}>Result</button></Link>

    return (
        <div className={style()}>
            <h3 className={style("category")}>{category}</h3>
            <p className={style("question")}>{question}</p>
            <p className={style("answer")}>{answer}</p>
            <div className={style("answer-box")}>{answers}</div>
            <br />
            {nextButton}
        </div>
    );
}

export default QuizElement;