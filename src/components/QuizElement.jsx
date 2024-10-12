import React, { useState, useEffect } from 'react';
import bemCssModules from 'bem-css-modules'
import { default as QuizElementStyle } from './styleModules/QuizElement.module.scss'

const style = bemCssModules(QuizElementStyle)

const QuizElement = (props) => {
    const { category, question, correct_answer, incorrect_answers, questionNumber, nextQuestion, handleCheckButton, hideQuestions, handleShowResults, answer } = props

    const [shuffledAnswers, setShuffledAnswers] = useState([]);


    useEffect(() => {
        const arrayOfAnswers = [...incorrect_answers, correct_answer];
        let randomIndex = Math.floor(Math.random() * 4);
        let temp = arrayOfAnswers[randomIndex];
        arrayOfAnswers[randomIndex] = arrayOfAnswers[3];
        arrayOfAnswers[3] = temp;

        setShuffledAnswers(arrayOfAnswers);
    }, [correct_answer, incorrect_answers])

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

    const nextButton = questionNumber < 9 ?
        <button className={style("next-button")} onClick={nextQuestion}>Next</button>
        :
        <button className={style("result-button")} onClick={showResults}>Results</button>

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