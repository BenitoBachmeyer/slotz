import {Card} from "../components/Card/Card.tsx";
import {Button} from "../components/Button/Button.tsx";
import {PageHeader} from "../components/PageHeader/PageHeader.tsx";
import "./HomePage.css";
import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <section>
            <PageHeader title={"Home Page"} subtitle={"This application is a slot machine demo built as a Single-Page-Application using the React Framework.\n" +
                "                It is supported by a restful API written in Java with the Spring Boot Framework. Users can explore the game, view payouts (non real), track statistics and manage demo settings."} />

            <div className="home-card-grid">
                <Card>
                    <h3>Play Slot Machine!</h3>
                    <p>Start a new spin and test your luck.</p>
                    <Link to="/slot" className={"card-button"}>
                        <Button>Go to Slots</Button>
                    </Link>
                </Card>

                <Card>
                    <h3>View the Paytable</h3>
                    <p>Check all winning combinations and payouts.</p>
                    <Link to={"/paytable"}>
                        <Button>View Paytable</Button>
                    </Link>
                </Card>

                <Card>
                    <h3>Check your Stats</h3>
                    <p>See all your winning shuffles and loses.</p>
                    <Link to={"/stats"}>
                        <Button>View Statistics</Button>
                    </Link>
                </Card>
                <Card>
                    <h3>Admin Page</h3>
                    <p>Adjust your settings.</p>
                    <Link to={"/admin"}>
                        <Button>View Admin</Button>
                    </Link>
                </Card>
            </div>
        </section>
    )
}