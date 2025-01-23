import Card from "../Card/Card.tsx"
import {Dispatch, HTMLAttributes, SetStateAction, useMemo, useState} from "react";
import {generateRandomPairs} from "../helper/generateRandomPairs.tsx";
import {GameOver} from "../GameOverWindow/GameOverWindow.tsx";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    numCards: number,
    onMove: () => void
}


export function Field({numCards, className,  onMove, ...divProps}: FieldProps) {
    const [flipped, setFlipped] = useState<boolean[]>(new Array(numCards).fill(false))
    const [found, setFound] = useState<boolean[]>(new Array(numCards).fill(false))
    const [gameOver, setGameOver] = useState(false);
    const arrayOfCardNumbers = useMemo(() => generateRandomPairs(numCards / 2), []);
    const handleCardClick = (cardIndex: number) => {
        return () => setFlipped(
            (currentState: boolean[]): boolean[] => {
                return updateField(cardIndex, currentState, found, setFound, arrayOfCardNumbers, onMove, setGameOver)
            }
        )
    }

    function onPlayAgain() {
    }

    return (
        <div className={className} style={divProps.style}>
            {arrayOfCardNumbers.map((i, j) => <Card key={j} number={i} flipped={flipped[j]} found={found[j]}
                                                    onCardClicked={handleCardClick(j)}/>)}
            {gameOver && GameOver({onPlayAgain, moves: 10})}
        </div>
    );
}

function updateField(cardIndex: number, flipped: boolean[], found: boolean[],
                     setFound: Dispatch<SetStateAction<boolean[]>>, arrayOfCardNumbers: number[], onMove:(() => void) | undefined, setGameOver): boolean[] {
    let newFlipped: boolean[] = [...flipped]
    let flippedNotFound: boolean[] = flipped.map((val, index) => val && !found[index])
    const numberOfFlippedNotFound: number = flippedNotFound.filter((value) => value).length
    const cardIsCovered: boolean = !flipped[cardIndex]

    if (cardIsCovered) {
        const thirdCardClicked: boolean = numberOfFlippedNotFound % 2 == 0 && numberOfFlippedNotFound !== 0
        if (thirdCardClicked) {
            newFlipped = unFlipBothCards(flipped, newFlipped, found)
        } else {
            newFlipped[cardIndex] = true
            const pairFound: boolean = arrayOfCardNumbers[cardIndex] == arrayOfCardNumbers[flippedNotFound.indexOf(true)]
            if (pairFound) {
                addPairToFound(newFlipped, cardIndex, flippedNotFound, setFound)
            }
        }
    }

    const flippedLength: number = newFlipped.filter((val,_) => val).length;
    const moveCompleted: boolean = flippedLength > 0 && flippedLength % 2 == 0;
    if (moveCompleted) {
        onMove?.()
    }
    const gameCompleted: boolean = found.every(val => val);
    setGameOver(gameCompleted)
    return newFlipped
}

function unFlipBothCards(flipped: boolean[], newFlipped: boolean[], found: boolean[]): boolean[] {
    const flippedNotFoundArray: boolean[] = flipped.map((a, i) => a && !found[i]);
    const indexesToUnflip: (number | null)[] = flippedNotFoundArray.map((x, i) => x ? i : null).filter(x => x !== null);
    indexesToUnflip.forEach((x) => {
        newFlipped[x] = false
    })
    return newFlipped
}

function addPairToFound(newFlipped: boolean[], cardIndex: number, flippedNotFound: boolean[], setFound: Dispatch<SetStateAction<boolean[]>>) {
    setFound((oldFoundState: boolean[]): boolean[] => {
        const newFoundState: boolean[] = [...oldFoundState]
        newFoundState[cardIndex] = true;
        newFoundState[flippedNotFound.indexOf(true)] = true;
        return newFoundState
    })
}