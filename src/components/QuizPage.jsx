import React, { useRef, useState } from 'react';
import axios from 'axios';
import anime from 'animejs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'

import QuizElement from './QuizElement';
import ResultPage from './ResultPage';
import { default as QuizPageStyle } from './styleModules/QuizPage.module.scss'

const style = bemCssModules(QuizPageStyle)

const EasyQuizPage = () => {
    const [questions, setQuestions] = useState(null)
    const [showQuestions, setShowQuestions] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [answer, setAnswer] = useState('Chosse an answer')
    const [points, setPoints] = useState(0)
    const [answerArray, setAnswerArray] = useState([])
    const location = useLocation()
    const quizBoxRef = useRef(null)

    const difficulty = location.state?.difficulty

    const decodeHTMLEntities = (str) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    const fetchQuestions = async () => {
        // Api call
        const result = await axios(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)

        const decodedQuestions = result.data.results.map(question => ({
            ...question,
            question: decodeHTMLEntities(question.question),
            correct_answer: decodeHTMLEntities(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map(answer => decodeHTMLEntities(answer))
        }));

        setQuestions(decodedQuestions)
    }

    const nextQuestion = () => {
        // Check if asnwer is correct
        if (answer === questions[questionNumber].correct_answer) {
            setPoints(points + 1);
            setAnswerArray([...answerArray, { isCorrect: true }])
        } else {
            setAnswerArray([...answerArray, { isCorrect: false }])
        }
        // Animation of question fade out
        anime({
            targets: quizBoxRef.current,
            opacity: 0,
            duration: 250,
            easing: 'easeInOutQuad',
            complete: () => {
                if (questionNumber < questions.length - 1) {
                    setQuestionNumber(prev => prev + 1);
                    setAnswer('Choose an answer');

                    // Animation of question fade in
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
        setAnswerArray([])
    }

    // Dificulty and start button display
    const showStartButton = !showQuestions && !showResults &&
        <div className={style("start-box")}>
            <h1 className={style("difficulty-level")}>You choose a difficulty: <p className={style("difficulty-value")}>{difficulty}</p></h1>
            {difficulty && <button onClick={showQuestionsBoxes} className={style("start-button")}>Start <FontAwesomeIcon icon={faPlay} /></button>}
        </div>

    // Quiz box display
    const showQuizElement = showQuestions && questions && questionNumber !== 10 &&
        <div ref={quizBoxRef}>
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
            {!showResults ? null : <ResultPage points={points} answerArray={answerArray} resetValues={resetValues} />}
        </div>
    );
}

export default EasyQuizPage;