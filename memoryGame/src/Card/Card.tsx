import "./Card.css"
import {useEffect, useState} from "react";

interface CardProps {
    number: number;
    flipped: boolean;
    onCardClicked: () => void;
    found: boolean;
    image: string;
}
export default function Card({ number, flipped, onCardClicked, found, image }: CardProps) {
    const content = flipped ? number.toString() : "Memory";

    return (
        <div className={`card ${flipped && found ? "card-found" : ""}`} onClick={onCardClicked}>
            <div className={`card-content ${flipped ? 'flipped' : ''}`}>
                {flipped && <img src={image} alt="Loading..." className={"card-content"}/>}
                {content}
            </div>
        </div>
    );
}
