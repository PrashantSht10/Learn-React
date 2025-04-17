export default function Joke(props) {
    return (
        <div className="container">
            {/* If we hadn't provided setup in the Joke component, we would use like this:
            {props.setup && <p className="setup">Setup: {props.setup}</p>} */}
             <p className="setup">Setup: {props.setup}</p>
             <p className="punchline">Punchline: {props.punchline}</p>
        </div>
    )
}