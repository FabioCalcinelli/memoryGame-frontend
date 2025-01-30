import "./Card.css"
import {useEffect, useState} from "react";

interface CardProps {
    number: number;
    flipped: boolean;
    onCardClicked: () => void;
    found: boolean;
}

const catProviderUrl = "https://cataas.com";

const fetchCatUrl = async (): Promise<string | null> => {
    try {
        const rawResponse = await fetch(`${catProviderUrl}/cat?json=true`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!rawResponse.ok) {
            console.error('Error fetching cat URL:', rawResponse.status);
            return null;
        }
        const jsonResponse = await rawResponse.json();
        console.log(catProviderUrl + '/cat/' + jsonResponse._id);
        return catProviderUrl + '/cat/' + jsonResponse._id;
    } catch (error) {
        console.error('Error fetching cat URL:', error);
        return null;
    }
};


export default function Card({ number, flipped, onCardClicked, found }: CardProps) {
    const [catUrl, setCatUrl] = useState<string | null>(null);

    useEffect(() => {
        if (flipped) {
            fetchCatUrl().then(url => setCatUrl(url));
        } else {
            setCatUrl(null);
        }
    }, [flipped]);

    const content = flipped ? number.toString() : "Memory";

    return (
        <div className={`card ${flipped && found ? "card-found" : ""}`} onClick={onCardClicked}>
            <div className={`card-content ${flipped ? 'flipped' : ''}`}>
                {flipped && catUrl && <img src={catUrl} alt="Loading..." style={{ width: '100%', height: '70%', objectFit: 'cover' }} />}
                {content}
            </div>
        </div>
    );
}
