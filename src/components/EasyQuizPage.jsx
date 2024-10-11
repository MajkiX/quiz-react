import React, { useEffect, useState } from 'react';
import QuizElement from './QuizElement';
import axios from 'axios';

import bemCssModules from 'bem-css-modules'
import { default as QuizPageStyle } from './styleModules/QuizPage.module.scss'

const style = bemCssModules(QuizPageStyle)

const EasyQuizPage = () => {
    const [questions, setQuestions] = useState(null)
    const [showQuestions, setShowQuestions] = useState(false)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [answer, setAnswer] = useState('Chosse an answer')
    const [points, setPoints] = useState(0)

    const fetchQuestions = async () => {
        const result = await axios("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
        setQuestions(result.data.results)
    }

    const nextQuestion = () => {
        if (answer === questions[questionNumber].correct_answer) {
            setPoints(points + 1)
        }
        setQuestionNumber(questionNumber + 1)
        setAnswer('Chosse an answer')
    }

    const showQuestionsBoxes = () => {
        fetchQuestions()
        setShowQuestions(!showQuestions)
    }

    const handleCheckButton = (answer) => {
        setAnswer(answer)
    }

    console.log(points);

    return (
        <div className={style()}>
            {!showQuestions && <button onClick={showQuestionsBoxes} className={style("start-button")}>Start</button>}
            {showQuestions && questions &&
                <QuizElement
                    category={questions[questionNumber].category}
                    question={questions[questionNumber].question}
                    correct_answer={questions[questionNumber].correct_answer}
                    incorrect_answers={questions[questionNumber].incorrect_answers}
                    questionNumber={questionNumber}
                    nextQuestion={nextQuestion}
                    handleCheckButton={handleCheckButton}
                    points={points}
                    answer={answer}
                />}

        </div>
    );
}

export default EasyQuizPage;