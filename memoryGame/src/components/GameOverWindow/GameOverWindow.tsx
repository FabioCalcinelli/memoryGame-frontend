interface GameOverProps {
    onPlayAgain: () => void,
    moves: number
}
import "./GameOverWindow.css"

export function GameOver({onPlayAgain, moves}: GameOverProps) {
    return (
        <div className="game-over-window">
            <h2>Congratulations!</h2>
            <p>You have completed the game in {moves} moves!</p>
            <button className="play-again-button" onClick={onPlayAgain}>
                Play Again
            </button>
        </div>
    );
}