import React from 'react';

function Landing({ startQuiz }) {
    return (
        <div className="flex h-screen flex-col items-center justify-center space-y-20 font-Inter">
            <div className="space-y-2 text-center">
                <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-4xl font-bold text-transparent">
                    Quizzical
                </h1>
                <p className="font-semibold">Let&apos;s start</p>
            </div>

            <button
                className="rounded-lg border-2 border-transparent bg-violet-500 px-5 py-2 text-xl font-semibold text-gray-50 shadow-lg shadow-violet-500/30 transition-all duration-300 hover:border-violet-500 hover:bg-violet-200 hover:text-gray-800"
                type="button"
                onClick={startQuiz}
            >
                Start Quiz
            </button>
        </div>
    );
}

export default Landing;
