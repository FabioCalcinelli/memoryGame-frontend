import { Field } from "./Field/Field.tsx";
import './App.css';

const NUM_CARDS = 40
const TITLE = "Memory Game"

function App() {
    return (
        <div className="container">
            <h1 className="title">{TITLE}</h1>
            <Field numCards={NUM_CARDS} className="field" />
        </div>
    )
}

export default App
