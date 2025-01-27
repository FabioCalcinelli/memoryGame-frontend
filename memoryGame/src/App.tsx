import { Field } from "./Field/Field.tsx";
import './App.css';
import {useState} from "react";
import {MovesCounter} from "./MovesCounter/MovesCounter.tsx";



const NUM_CARDS = 4
const TITLE = "Memory Game"

function App() {
    const [moves, setMoves] = useState(0);

    return (
        <div className="container">
            <h1 className="title">{TITLE}</h1>
            <Field numCards={NUM_CARDS} className="field" onMove={() => setMoves(moves+1)} resetMoves={() => setMoves(0)}/>
            <MovesCounter count={moves} className="moves-counter" />
        </div>
    )
}

export default App
