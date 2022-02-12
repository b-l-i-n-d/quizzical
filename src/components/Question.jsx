import { decode } from 'html-entities';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';

function Question({ id, question, options, correctAnswer, selectedOption, complete }) {
    const [choosenOption, setChoosenOption] = useState('');

    function chooseOption(option) {
        if (complete) {
            return;
        }
        setChoosenOption(option);
        selectedOption(id, option);
    }

    const optionElements = options.map((option) => {
        let color = 'bg-violet-100';
        let text = 'text-black';
        let shadow = 'shadow-violet-100/30';

        if (option === choosenOption && !complete) {
            color = 'bg-violet-500';
            text = 'text-white';
            shadow = 'shadow-violet-500/30';
        } else if (option === correctAnswer && complete) {
            color = 'bg-green-500';
            text = 'text-white';
            shadow = 'shadow-green-500/30';
        } else if (option === choosenOption && correctAnswer !== choosenOption && complete) {
            color = 'bg-red-500';
            text = 'text-white';
            shadow = 'shadow-red-500/30';
        }

        return (
            <span
                aria-hidden="true"
                className={`cursor-pointer rounded-lg  font-medium ${text} ${color} py-2 px-4 font-medium shadow-lg ${shadow} m-2 hover:bg-violet-200`}
                key={nanoid()}
                onClick={() => chooseOption(option)}
            >
                {decode(option)}
            </span>
        );
    });

    return (
        <div className="space-y-5 py-4">
            <div className="font-Inter text-xl font-bold text-gray-700">{decode(question)}</div>
            <div className="flex flex-row flex-wrap items-center">{optionElements}</div>
            <hr />
        </div>
    );
}

export default Question;
