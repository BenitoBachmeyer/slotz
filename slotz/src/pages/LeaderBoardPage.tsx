import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { Card } from "../components/Card/Card.tsx";
import "./LeaderBoardPage.css";

type LeaderboardEntry = {
    rank: number;
    playerName: string;
    totalCreditsWon: number;
    bestPayout: number;
    totalSpins: number;
};

const leaderboardData: LeaderboardEntry[] = [
    {
        rank: 1,
        playerName: "Benito",
        totalCreditsWon: 12450,
        bestPayout: 50,
        totalSpins: 184,
    },
    {
        rank: 2,
        playerName: "Antal",
        totalCreditsWon: 11280,
        bestPayout: 32,
        totalSpins: 201,
    },
    {
        rank: 3,
        playerName: "Tom",
        totalCreditsWon: 10340,
        bestPayout: 50,
        totalSpins: 167,
    },
    {
        rank: 4,
        playerName: "Julia",
        totalCreditsWon: 8940,
        bestPayout: 24,
        totalSpins: 153,
    },
    {
        rank: 5,
        playerName: "Jonas",
        totalCreditsWon: 8120,
        bestPayout: 20,
        totalSpins: 146,
    },
    {
        rank: 6,
        playerName: "Jeff",
        totalCreditsWon: 7560,
        bestPayout: 24,
        totalSpins: 139,
    },
    {
        rank: 7,
        playerName: "Stefan",
        totalCreditsWon: 6890,
        bestPayout: 16,
        totalSpins: 128,
    },
];

export const LeaderBoardPage = () => {
    return (
        <section className="leaderboard-page">
            <PageHeader
                title="Leaderboard"
                subtitle="Top demo players ranked by total credits won. This page currently uses static demo data."
            />

            <div className="leaderboard-page__grid">
                {leaderboardData.map((player) => (
                    <Card className="leaderboard-card" key={player.rank}>
                        <div className="leaderboard-card__header">
                            <div className="leaderboard-card__rank">#{player.rank}</div>
                            <div>
                                <h2 className="leaderboard-card__name">{player.playerName}</h2>
                            </div>
                        </div>

                        <div className="leaderboard-card__stats">
                            <div className="leaderboard-card__stat">
                                <span>Total Credits Won</span>
                                <strong>{player.totalCreditsWon.toLocaleString()}</strong>
                            </div>

                            <div className="leaderboard-card__stat">
                                <span>Best Payout</span>
                                <strong>{player.bestPayout}x</strong>
                            </div>

                            <div className="leaderboard-card__stat">
                                <span>Total Spins</span>
                                <strong>{player.totalSpins}</strong>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};