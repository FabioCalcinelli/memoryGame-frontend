import Card from "../Card/Card.tsx"
import {HTMLAttributes} from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    numCards: number
}


export function Field({ numCards, className, ...divProps }: FieldProps) {
    const arr = Array(numCards).fill(0).map((_, i) => i + 1);

    return (
        <div className={className} style={divProps.style}>
            {arr.map((i) => <Card key={i} number={i} />)}
        </div>
    );
}
