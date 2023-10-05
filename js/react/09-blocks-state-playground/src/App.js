import React from 'react';
import './App.css';
import boxes from './boxes';
import Box from './components/Box';

function App() {
    const [squares, setSquare] = React.useState(boxes);

    function toggle(id) {
      setSquare( prevSquare => {
        return prevSquare.map((square) => {
          return square.id === id ? { ...square, on: !square.on}: square
        })
      })
    }

    const squareElements = squares.map( square => (
      <Box key={square.id}
        id = {square.id}
        on = {square.on}
        handleClick = {() => toggle(square.id)}
      />
    ));

    return (
        <div className="App">
            {squareElements}
        </div>
    );
}

export default App;
