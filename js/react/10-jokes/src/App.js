import React from 'react';
import './App.css';
import Jokes from './components/Jokes';
import jokesData from './jokesData';

function App() {
    const jokeElements = jokesData.map((joke) => {
        return <Jokes setup={joke.setup} punchline={joke.punchline} />;
    });

    return <div className="App">{jokeElements}</div>;
}

export default App;
