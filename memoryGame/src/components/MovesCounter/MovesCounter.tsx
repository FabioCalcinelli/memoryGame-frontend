import {HTMLAttributes} from "react";
import "./MovesCounter.css";
interface MovesCounterProps extends HTMLAttributes<HTMLDivElement>{
    count: number;
}

export function MovesCounter({count, className, ...divProps}: MovesCounterProps) {
    return <div className={className} style={divProps.style}>Moves: {count}</div>;
}