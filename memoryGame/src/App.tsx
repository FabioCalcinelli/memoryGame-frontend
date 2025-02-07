import './App.css';
import {useEffect, useState} from "react";
import {MovesCounter} from "./components/MovesCounter/MovesCounter.tsx";
import {useGenerateImages} from "./helper/generateImages.tsx";
import {startGame, handleCardClick} from "./api/gameStateFetch.ts";
import Card from "./components/Card/Card.tsx";
import {GameOver} from "./components/GameOverWindow/GameOverWindow.tsx";


const TITLE = "Memory Game"

function App() {
    const [gameState, setGameState] = useState(null);
    const [playAgain, setPlayAgain] = useState(false);

    useEffect(() => {
        startGame().then(gameState => setGameState(gameState));
    }, [playAgain]);

    const {images, loading, error} = useGenerateImages(gameState ? gameState.flipped.length / 2 : 0, playAgain);

    if (!gameState || loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            {gameState && (
                <div>
                    <h1 className="title">{TITLE}</h1>
                    <div className="field">
                        {gameState.card_numbers.map((i, j) =>
                            <Card
                                key={j}
                                number={i}
                                flipped={gameState.flipped[j]}
                                found={gameState.found[j]}
                                onCardClicked={() => handleCardClick(j).then(newGameState => {
                                    setGameState(newGameState);
                                })}
                                image={images[i]}
                            />)}
                        {gameState.game_over && <GameOver onPlayAgain={() => setPlayAgain(!playAgain)} moves={gameState.nr_of_moves} />}
                    </div>
                    <MovesCounter count={gameState.nr_of_moves} className="moves-counter"/>
                </div>
            )
            }
        < /div>)
}

export default App
