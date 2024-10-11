import React, { useState } from 'react';
import QuizElement from './QuizElement';
import axios from 'axios';

import bemCssModules from 'bem-css-modules'
import { default as QuizPageStyle } from './styleModules/QuizPage.module.scss'
import ResultPage from './ResultPage';

const style = bemCssModules(QuizPageStyle)

const EasyQuizPage = () => {
    const [questions, setQuestions] = useState(null)
    const [showQuestions, setShowQuestions] = useState(false)
    const [showResults, setShowResults] = useState(false)
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
        if (questionNumber < questions.length - 1) {
            setQuestionNumber(questionNumber + 1);
            setAnswer('Choose an answer')
        } else {
            return
        }
    }

    const handleShowResults = () => {
        setShowResults(!showResults)
    }

    const showQuestionsBoxes = () => {
        fetchQuestions()
        setShowQuestions(!showQuestions)
    }

    const handleCheckButton = (answer) => {
        setAnswer(answer)
    }

    const hideQuestions = () => {
        setShowQuestions(!showQuestions)
    }

    const resetValues = () => {
        setQuestions(null)
        setShowQuestions(false)
        setQuestionNumber(0)
        setAnswer("Chosse an answer")
        setPoints(0)
    }

    const showStartButton = !showQuestions && !showResults && <button onClick={showQuestionsBoxes} className={style("start-button")}>Start</button>
    const showQuizElement = showQuestions && questions && questionNumber !== 10 &&
        <QuizElement
            category={questions[questionNumber].category}
            question={questions[questionNumber].question}
            correct_answer={questions[questionNumber].correct_answer}
            incorrect_answers={questions[questionNumber].incorrect_answers}
            questionNumber={questionNumber}
            nextQuestion={nextQuestion}
            handleCheckButton={handleCheckButton}
            hideQuestions={hideQuestions}
            handleShowResults={handleShowResults}
            answer={answer}
        />

    return (
        <div className={style()}>
            {showStartButton}
            {showQuizElement}
            {!showResults ? null : <ResultPage points={points} resetValues={resetValues} />}
        </div>
    );
}

export default EasyQuizPage;