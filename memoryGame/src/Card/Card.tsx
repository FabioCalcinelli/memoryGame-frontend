import "./Card.css"

export default function Card(props: {number: number}) {
    return (<div className="Card">{props.number.toString()}</div>)
}