import Card from "../Card/Card.tsx"
import {HTMLAttributes, useMemo, useState} from "react";
import {generateRandomPairs} from "../helper/generateRandomPairs.tsx";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    numCards: number
}


export function Field({numCards, className, ...divProps}: FieldProps) {
    const [flipped, setFlipped] = useState<boolean[]>(new Array(numCards).fill(false))
    const [found, setFound] = useState<boolean[]>(new Array(numCards).fill(false))
    const arrayOfCardNumbers = useMemo(() => generateRandomPairs(numCards / 2), []);
    const handleCardClick = (cardIndex: number) => {
        return () => setFlipped(
            (oldState: boolean[]): boolean[] => {
                const newState: boolean[] = [...oldState]
                const numberOfFlipped: number = flipped.length
                if (!oldState[cardIndex]) {
                    if (numberOfFlipped % 2 == 0 && numberOfFlipped !== 0) {
                        const flippedNotFoundArray: boolean[] = oldState.map((a, i) => a && !found[i]);
                        const indexesToUnflip: (number | null)[] = flippedNotFoundArray.map((x, i) => x ? i : null).filter(x => x !== null);
                        indexesToUnflip.forEach((x) => {
                            newState[x] = false
                        })
                    } else {
                        if (arrayOfCardNumbers[cardIndex] == arrayOfCardNumbers[oldState.indexOf(true)]) {
                            newState[cardIndex] = !oldState[cardIndex]
                            setFound((oldFoundState: boolean[]): boolean[] => {
                                const newFoundState: boolean[] = [...oldFoundState]
                                newFoundState[cardIndex] = true;
                                newFoundState[oldState.indexOf(true)] = true;
                                return newFoundState
                            })
                        }
                    }
                }
                return newState
            }
        )
    }
    return (
        <div className={className} style={divProps.style}>
            {arrayOfCardNumbers.map((i, j) => <Card key={j} number={i} flipped={flipped[j]} found={found[j]}
                                                    onCardClicked={handleCardClick(j)}/>)}
        </div>
    );
}
