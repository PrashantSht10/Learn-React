export default function Die(props) {
    const pipPatterns = {
        1: [false, false, false, false, true, false, false, false, false],
        2: [true, false, false, false, false, false, false, false, true],
        3: [true, false, false, false, true, false, false, false, true],
        4: [true, false, true, false, false, false, true, false, true],
        5: [true, false, true, false, true, false, true, false, true],
        6: [true, false, true, true, false, true, true, false, true],
    };

    return (
        <button 
            className={`die-face ${props.isHeld ? "held" : ""}`}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die showing ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >
            <div className="pips-grid">
                {pipPatterns[props.value].map((pip, index) => (
                    <span key={index} className={`pip ${pip ? "visible" : ""}`} />
                ))}
            </div>
        </button>
    );
}




// export default function Die(props) {
//     const styles = {
//         backgroundColor: props.isHeld ? "#59E391" : "white"
//     }
    
//     return (
//         <button 
//             style={styles}
//             onClick={props.hold}
//             aria-pressed={props.isHeld}
//             aria-label={`Die with value ${props.value}, 
//             ${props.isHeld ? "held" : "not held"}`}
//         >{props.value}</button>
//     )
// }