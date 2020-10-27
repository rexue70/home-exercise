import React from 'react';
import Flexbox from 'flexbox-react';

export interface Choice {
    choiceId: string; text: string; onClick: (choiceId: string) => void
};

export interface MultipleChoiceProps {
    headerText: string;
    choices: Array<Choice>;
};

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ headerText, choices }) => {
    return (
        <Flexbox flexDirection="column">
            <Flexbox alignContent="center">
    <h2>{headerText}</h2>
            </Flexbox>
            <Flexbox flexDirection="row">
                {choices.map(({choiceId, text, onClick}) => {
                    return <button onClick={() => onClick(choiceId)}>{text}</button>;
                })}
            </Flexbox>
        </Flexbox>
    );
};

