import "./Card.css"


interface CardProps {
    number: number,
    flipped: boolean,
    onCardClicked: () => void,
    found: boolean,
    image: string,
    key?: unknown
}

export default function Card({number, flipped, onCardClicked, found, image, key}: CardProps) {
    const content = flipped || found ? number.toString() : "Memory";
    return (
        <div className={`card ${found ? "card-found" : ""} ${flipped || found ? "card-static" : ""}`}
             onClick={onCardClicked}>
            <div className={`card-content ${flipped || found ? 'flipped' : ''}`}>
                {(flipped || found) && <img src={image} alt="Loading..." className={"card-content"}/>}
                {content}
            </div>
        </div>
    );
}
