import Card from "../Card/Card.tsx"
import {Dispatch, HTMLAttributes, SetStateAction, useMemo, useState} from "react";
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
            (currentState: boolean[]): boolean[] => {
                return updateField(cardIndex, currentState, found, setFound, arrayOfCardNumbers)
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

function updateField(cardIndex: number, flipped: boolean[], found: boolean[],
                     setFound: Dispatch<SetStateAction<boolean[]>>, arrayOfCardNumbers: number[]) : boolean[] {
    let newFlipped: boolean[] = [...flipped]
    const numberOfFlipped: number = flipped.length
    const cardIsCovered: boolean = !flipped[cardIndex]
    if (cardIsCovered) {
        const thirdCardClicked: boolean = numberOfFlipped % 2 == 0 && numberOfFlipped !== 0
        if (thirdCardClicked) {
            newFlipped = unFlipBothCards(flipped, flipped, found)
        } else {
            const pairFound: boolean = arrayOfCardNumbers[cardIndex] == arrayOfCardNumbers[flipped.indexOf(true)]
            if (pairFound) {
                newFlipped[cardIndex] = true
                addPairToFound(newFlipped, cardIndex, flipped, setFound)
            }
        }
    }
    return newFlipped
}

function unFlipBothCards(flipped: boolean[], newFlipped: boolean[], found: boolean[]) : boolean[] {
    const flippedNotFoundArray: boolean[] = flipped.map((a, i) => a && !found[i]);
    const indexesToUnflip: (number | null)[] = flippedNotFoundArray.map((x, i) => x ? i : null).filter(x => x !== null);
    indexesToUnflip.forEach((x) => {
        newFlipped[x] = false
    })
    return flipped
}

function addPairToFound(newFlipped: boolean[], cardIndex: number, flipped: boolean[], setFound: Dispatch<SetStateAction<boolean[]>>) {
    setFound((oldFoundState: boolean[]): boolean[] => {
        const newFoundState: boolean[] = [...oldFoundState]
        newFoundState[cardIndex] = true;
        newFoundState[flipped.indexOf(true)] = true;
        return newFoundState
    })
}