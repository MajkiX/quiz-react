import React, { useRef, useState } from 'react';
import QuizElement from './QuizElement';
import axios from 'axios';
import anime from 'animejs'

import bemCssModules from 'bem-css-modules'
import { default as QuizPageStyle } from './styleModules/QuizPage.module.scss'
import ResultPage from './ResultPage';
import { useLocation } from 'react-router-dom';

const style = bemCssModules(QuizPageStyle)

const EasyQuizPage = () => {
    const [questions, setQuestions] = useState(null)
    const [showQuestions, setShowQuestions] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [answer, setAnswer] = useState('Chosse an answer')
    const [points, setPoints] = useState(0)
    const location = useLocation()
    const quizBoxRef = useRef(null)

    const difficulty = location.state?.difficulty


    const fetchQuestions = async () => {
        const result = await axios(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)
        setQuestions(result.data.results)
    }

    const nextQuestion = () => {
        if (answer === questions[questionNumber].correct_answer) {
            setPoints(points + 1);
        }
        anime({
            targets: quizBoxRef.current,
            opacity: 0,
            duration: 250,
            easing: 'easeInOutQuad',
            complete: () => {
                if (questionNumber < questions.length - 1) {
                    setQuestionNumber(prev => prev + 1);
                    setAnswer('Choose an answer');

                    anime({
                        targets: quizBoxRef.current,
                        translateX: '0px',
                        opacity: 1,
                        duration: 250
                    });
                } else {
                    handleShowResults();
                }
            }
        });
    }

    const handleShowResults = () => {
        setShowResults(!showResults)
    }

    const showQuestionsBoxes = () => {
        fetchQuestions()
        setShowQuestions(!showQuestions)
    }

    const handleAnswerButton = (answer) => {
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

    const showStartButton = !showQuestions && !showResults &&
        <div className={style("start-box")}>
            <h1 className={style("dificulty-level")}>You choose a difficulty: {difficulty}</h1>
            <button onClick={showQuestionsBoxes} className={style("start-button")}>Start</button>
        </div>

    const showQuizElement = showQuestions && questions && questionNumber !== 10 &&
        <div ref={quizBoxRef} className={style('quizBox')}>
            <QuizElement
                category={questions[questionNumber].category}
                question={questions[questionNumber].question}
                correct_answer={questions[questionNumber].correct_answer}
                incorrect_answers={questions[questionNumber].incorrect_answers}
                questionNumber={questionNumber}
                nextQuestion={nextQuestion}
                handleCheckButton={handleAnswerButton}
                hideQuestions={hideQuestions}
                handleShowResults={handleShowResults}
                answer={answer}
            />
        </div>

    return (
        <div className={style()}>
            {showStartButton}
            {showQuizElement}
            {!showResults ? null : <ResultPage points={points} resetValues={resetValues} />}
        </div>
    );
}

export default EasyQuizPage;