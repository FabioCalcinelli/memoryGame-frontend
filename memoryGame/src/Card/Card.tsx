import "./Card.css"

export default function Card(props: { number: number, flipped: boolean, onCardClicked: () => void, found: boolean }) {
    if (props.flipped) {
        if (props.found){
            return (<div className="card-found" >{props.number.toString()}</div>)
        }
        return (<div className="card" onClick={props.onCardClicked}>{props.number.toString()}</div>)
    } else {
        return (<div className="card" onClick={props.onCardClicked}>{"Memory"}</div>)
    }

}
