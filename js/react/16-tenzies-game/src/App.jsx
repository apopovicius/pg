import React from 'react'
import './App.css'
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(d => d.isHeld)
    const allSame = dice.every(d => d.value === dice[0].value)

    if(allHeld && allSame) {
      setTenzies(true)
      console.log('You won!');
    }
  }, [dice]);

  console.log(dice);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
    }

  function rollDice() {
    if(tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
  }


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }
    ))
  }

    const diceElements = dice.map(die => <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={ () => holdDice(die.id)}
    />)

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies? "New game" : "Roll"}</button>
        </main>
    )
}

export default App
