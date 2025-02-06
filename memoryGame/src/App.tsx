import { Field } from "./Field/Field.tsx";
import './App.css';
import {useState} from "react";
import {MovesCounter} from "./MovesCounter/MovesCounter.tsx";
import {useGenerateImages} from "./helper/generateImages.tsx";



const NUM_CARDS = 40
const TITLE = "Memory Game"

function App() {
    const [moves, setMoves] = useState(0);
    const [playAgain, setPlayAgain] = useState(false);
    const { arrayOfImages, loading, error } = useGenerateImages(NUM_CARDS, playAgain);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h1 className="title">{TITLE}</h1>
            <Field />
            <MovesCounter count={moves} className="moves-counter" />
        </div>
    )
}

export default App
