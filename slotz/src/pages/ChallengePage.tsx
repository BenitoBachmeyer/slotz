import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { Card } from "../components/Card/Card.tsx";
import "./ChallengePage.css";

type ChallengeEntry = {
    id: number;
    title: string;
    description: string;
    reward: string;
    difficulty: string;
};

const challengesData: ChallengeEntry[] = [
    {
        id: 1,
        title: "Spin Marathon",
        description: "Complete 100 spins in total and prove your endurance at the slot machine.",
        reward: "Reward: Marathon Badge",
        difficulty: "Easy",
    },
    {
        id: 2,
        title: "Winning Streak",
        description: "Win 3 spins in a row without breaking your streak.",
        reward: "Reward: Streak Master Title",
        difficulty: "Medium",
    },
    {
        id: 3,
        title: "Top of the Board",
        description: "Reach rank #1 on the leaderboard and beat all other demo players.",
        reward: "Reward: Champion Crown",
        difficulty: "Hard",
    },
    {
        id: 4,
        title: "Big Bell Energy",
        description: "Hit a Bell combination with a payout of at least 25x in a single spin.",
        reward: "Reward: High Roller Badge",
        difficulty: "Hard",
    },
];

export const ChallengePage = () => {
    return (
        <section className="challenges-page">
            <PageHeader
                title="Challenges"
                subtitle="Take on optional demo challenges and test your slot machine skills."
            />

            <div className="challenges-page__grid">
                {challengesData.map((challenge) => (
                    <Card className="challenge-card" key={challenge.id}>
                        <div className="challenge-card__header">
                            <span className="challenge-card__difficulty">
                                {challenge.difficulty}
                            </span>
                            <h2 className="challenge-card__title">{challenge.title}</h2>
                        </div>

                        <p className="challenge-card__description">
                            {challenge.description}
                        </p>

                        <div className="challenge-card__footer">
                            <span className="challenge-card__reward">
                                {challenge.reward}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};