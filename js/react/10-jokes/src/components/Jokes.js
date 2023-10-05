import React from 'react';

export default function Jokes(props) {
    const [isShown, setIsShown] = React.useState(false);

    function showHidePunchline() {
        setIsShown((prevIsShown) => !prevIsShown);
    }

    return (
        <div>
            {props.setup && <h3>Setup: {props.setup}</h3>}
            {isShown && <p>Punchline: {props.punchline}</p>}
            <button onClick={showHidePunchline}>
                {!isShown ? 'Show' : 'Hide'} punchline
            </button>
            <hr />
        </div>
    );
}
