import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Hypnosis } from 'react-cssfx-loading';
import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';

function App() {
    const [isQuiz, setIsQuiz] = useState(JSON.parse(localStorage.getItem('isQuiz')) || false);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [complete, setComplete] = useState(false);
    const [answerCount, setAnswerCount] = useState(0);

    function startQuizHandeler() {
        setIsQuiz(true);
    }

    // Fisher-Yates (aka Knuth) Shuffle.
    function shuffle(array) {
        const theArray = array;
        let currentIndex = theArray.length;
        let randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            [theArray[currentIndex], theArray[randomIndex]] = [
                theArray[randomIndex],
                theArray[currentIndex],
            ];
        }

        return theArray;
    }

    const selectedAnswerHandler = (id, answer) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === id ? { ...question, selectedAnswer: answer } : question
            )
        );
    };

    function checkAnswer() {
        questions.map(
            (question) =>
                question.correctAnswer === question.selectedAnswer &&
                setAnswerCount((prevCount) => prevCount + 1)
        );

        setComplete(true);
    }

    function startOver() {
        setComplete(false);
        setQuestions([]);
        setIsQuiz(false);
        setAnswerCount(0);
    }

    useEffect(() => {
        localStorage.setItem('isQuiz', isQuiz);

        if (isQuiz) {
            setIsLoading(true);
            fetch('https://opentdb.com/api.php?amount=5')
                .then((res) => res.json())
                .then((data) =>
                    setQuestions(
                        data.results.map((questionData) => {
                            const {
                                question,
                                incorrect_answers: incorrectAnswers,
                                correct_answer: correctAnswer,
                            } = questionData;

                            const options = [correctAnswer, ...incorrectAnswers];
                            setIsLoading(false);

                            return {
                                id: nanoid(),
                                question,
                                options: shuffle(options),
                                correctAnswer,
                                selectedAnswer: '',
                            };
                        })
                    )
                );
        }
    }, [isQuiz]);

    const questionElememts = questions.map((question) => (
        <Question
            key={question.id}
            id={question.id}
            question={question.question}
            options={question.options}
            correctAnswer={question.correctAnswer}
            selectedOption={selectedAnswerHandler}
            complete={complete}
        />
    ));

    return (
        <main className=" bg-slate-50">
            {!isQuiz && <Landing startQuiz={() => startQuizHandeler()} />}

            {isQuiz &&
                (isLoading ? (
                    <div className="flex h-screen items-center justify-center">
                        <Hypnosis color="#8b5cf6" />
                    </div>
                ) : (
                    <div className="mx-auto max-w-6xl px-4 py-5">
                        <div className="pb-12">{questionElememts}</div>
                        <div className="fixed inset-x-0 bottom-0 flex justify-center border-t-2 border-violet-400 bg-white py-5">
                            {!complete && !isLoading && (
                                <button
                                    className="rounded-lg border-2 border-transparent bg-violet-500 px-5 py-2 font-medium text-gray-50 transition-all duration-300 hover:border-violet-300 hover:bg-violet-200 hover:text-violet-500"
                                    type="button"
                                    onClick={() => checkAnswer()}
                                >
                                    Check Answer
                                </button>
                            )}
                            {complete && (
                                <div className="flex items-center space-x-5">
                                    <p>You scored {answerCount} / 5</p>
                                    <button
                                        className="rounded-lg border-2 border-transparent bg-violet-500 px-5 py-2 font-medium text-gray-50 transition-all duration-300 hover:border-violet-300 hover:bg-violet-200 hover:text-violet-500"
                                        type="button"
                                        onClick={() => startOver()}
                                    >
                                        Play again
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </main>
    );
}

export default App;
