// import Contact from "./Contact"
// import mrWhiskerson from "./images/mr-whiskerson.png"
// import fluffykins from "./images/fluffykins.png"
// import felix from "./images/felix.png"
// import pumpkin from "./images/pumpkin.png"

import Header from "./components/Header"
import Entry from "./components/Entry"
import data from "./data"

export default function App() {
    
    const entryElements = data.map((entry) => {
        return (
            <Entry
                key={entry.id}
                img={entry.img}
                title={entry.title}
                country={entry.country}
                googleMapsLink={entry.googleMapsLink}
                dates={entry.dates}
                text={entry.text}

                //entry={entry}
                //{...entry}
            />
        )
    })
    
    return (
        <>
            <Header />
            <main className="container">
                {entryElements}
            </main>
        </>
    )
}