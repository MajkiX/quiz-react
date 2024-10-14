import React, { useState, useEffect } from 'react';
import bemCssModules from 'bem-css-modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import { default as QuizElementStyle } from './styleModules/QuizElement.module.scss'

const style = bemCssModules(QuizElementStyle)

const QuizElement = (props) => {
    const { category, question, correct_answer, incorrect_answers, questionNumber, nextQuestion, handleCheckButton, hideQuestions, handleShowResults, answer } = props

    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // Randomization of idexes in array
    useEffect(() => {
        const arrayOfAnswers = [...incorrect_answers, correct_answer];
        let randomIndex = Math.floor(Math.random() * 4);
        let temp = arrayOfAnswers[randomIndex];
        arrayOfAnswers[randomIndex] = arrayOfAnswers[3];
        arrayOfAnswers[3] = temp;

        setShuffledAnswers(arrayOfAnswers);
    }, [correct_answer, incorrect_answers])

    // Answer buttons display
    const answers = shuffledAnswers.map(answer => (
        <button
            className={style("answer-button")}
            key={answer}
            onClick={() => handleCheckButton(answer)}
        >
            {answer}
        </button>
    ))

    const showResults = () => {
        nextQuestion()
        hideQuestions()
        handleShowResults()
    }

    // Next or Resluts button
    const nextButton = questionNumber < 9 ?
        <button className={style("next-button")} onClick={nextQuestion}>
            Next
            <FontAwesomeIcon icon={faAngleRight} />
        </button>
        :
        <button className={style("result-button")} onClick={showResults}>
            Results
            <FontAwesomeIcon icon={faAnglesRight} />
        </button>

    return (
        <div className={style()}>
            <h2 className={style("category")}>{category}</h2>
            <h1 className={style("question")}>{question}</h1>
            <h3 className={style("answer")}>{answer}</h3>
            <div className={style("answer-box")}>{answers}</div>
            <br />
            {nextButton}
        </div>
    );
}

export default QuizElement;