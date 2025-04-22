
import { useState, useEffect, useRef } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [rollCount, setRollCount] = useState(0)  // Track number of rolls
    const [timeElapsed, setTimeElapsed] = useState(0) // Track time elapsed (in seconds)
    const [isRunning, setIsRunning] = useState(true) // Track if timer is running
    const buttonRef = useRef(null)

    // Ensure this comes after the state variables
    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);  // Cleanup timer on unmount
    }, [isRunning]);

    useEffect(() => {
        if (gameWon) {
            setIsRunning(false);
            buttonRef.current.focus();
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function rollDice() {
        if (!gameWon) {
            if (rollCount === 0) setIsRunning(true);
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
            ));
            setRollCount(prevCount => prevCount + 1);
        } else {
            setDice(generateAllNewDice());
            setRollCount(0);
            setTimeElapsed(0);
            setIsRunning(true);
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main>
            {/* Show confetti only if the game is won */}
            {gameWon && <Confetti numberOfPieces={1000} />}
            
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            
            <h1 className="title">Tenzies</h1>
            
            <div className="instructions">
                {gameWon
                    ? (
                        <>
                            <h3>🎉 Congratulations! You won!🎉</h3>
                            <p>Press 'New Game' to play again.</p>
                        </>
                    )
                    : (
                        <>
                            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                        </>
                    )
                }
            </div>
            
            <div className="stats">
                <p>⏳ Time: {timeElapsed}s</p>
                <p>🎲 Rolls: {rollCount}</p>
            </div>
            
            <div className="dice-container">
                {diceElements}
            </div>
            
            {/* Display the "New Game" button or "Roll" button based on game state */}
            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
