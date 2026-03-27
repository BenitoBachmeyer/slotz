import {createBrowserRouter} from "react-router";
import Layout from "./Layout.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import SlotPage from "./pages/SlotPage.tsx";
import {SymbolsPage} from "./pages/SymbolsPage.tsx";
import PaytablePage from "./pages/PaytablePage.tsx";
import {HistoryPage} from "./pages/HistoryPage.tsx";
import {StatsPage} from "./pages/StatsPage.tsx";
import {ChallengePage} from "./pages/ChallengePage.tsx";
import {LeaderBoardPage} from "./pages/LeaderBoardPage.tsx";
import {SettingsPage} from "./pages/SettingsPage.tsx";
import {PageNotFoundPage} from "./pages/PageNotFoundPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage />},
            { path: "slot", element: <SlotPage />},
            { path: "paytable", element: <PaytablePage /> },
            { path: "symbols", element: <SymbolsPage /> },
            { path: "history", element: <HistoryPage /> },
            { path: "stats", element: <StatsPage /> },
            { path: "challenges", element: <ChallengePage /> },
            { path: "leaderboard", element: <LeaderBoardPage /> },
            { path: "settings", element: <SettingsPage /> },
            { path: "*", element: <PageNotFoundPage /> },
        ],
    },
]);
export default router;