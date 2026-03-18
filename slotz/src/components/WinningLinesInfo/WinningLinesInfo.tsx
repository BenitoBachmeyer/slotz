import "./WinningLinesInfo.css";

const lines = [
    {
        title: "Line 1",
        ascii: `R1  [X] [X] [X] [X] [X]
R2  [ ] [ ] [ ] [ ] [ ]
R3  [ ] [ ] [ ] [ ] [ ]
R4  [ ] [ ] [ ] [ ] [ ]`,
    },
    {
        title: "Line 2",
        ascii: `R1  [ ] [ ] [ ] [ ] [ ]
R2  [X] [X] [X] [X] [X]
R3  [ ] [ ] [ ] [ ] [ ]
R4  [ ] [ ] [ ] [ ] [ ]`,
    },
    {
        title: "Line 3",
        ascii: `R1  [ ] [ ] [ ] [ ] [ ]
R2  [ ] [ ] [ ] [ ] [ ]
R3  [X] [X] [X] [X] [X]
R4  [ ] [ ] [ ] [ ] [ ]`,
    },
    {
        title: "Line 4",
        ascii: `R1  [ ] [ ] [ ] [ ] [ ]
R2  [ ] [ ] [ ] [ ] [ ]
R3  [ ] [ ] [ ] [ ] [ ]
R4  [X] [X] [X] [X] [X]`,
    },
    {
        title: "Line 5",
        ascii: `R1  [X] [ ] [ ] [ ] [ ]
R2  [ ] [X] [ ] [ ] [ ]
R3  [ ] [ ] [X] [ ] [ ]
R4  [ ] [ ] [ ] [X] [X]`,
    },
    {
        title: "Line 6",
        ascii: `R1  [ ] [ ] [ ] [X] [X]
R2  [ ] [ ] [X] [ ] [ ]
R3  [ ] [X] [ ] [ ] [ ]
R4  [X] [ ] [ ] [ ] [ ]`,
    },
];

export const WinningLinesInfo = () => {
    return (
        <section className="winning-lines-section">
            <h2>Active Paylines</h2>
            <p className="winning-lines-text">
                The game uses 6 active paylines. Winning combinations are evaluated
                from left to right and must start on reel 1.
            </p>

            <div className="winning-lines-grid">
                {lines.map((line) => (
                    <div className="winning-line-card" key={line.title}>
                        <h3>{line.title}</h3>
                        <pre className="winning-lines-ascii">{line.ascii}</pre>
                    </div>
                ))}
            </div>
        </section>
    );
};