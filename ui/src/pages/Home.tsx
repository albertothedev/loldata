import { Link } from "react-router-dom";

import championDetails from "../assets/championDetails.png";
import matchDetails from "../assets/matchDetails.png";

const Home = (): JSX.Element => (
  <div className="home">
    <h1>Analytics about your latest matches and information about your favorite champions</h1>

    <div className="champions">
      <img className="championDetails" src={championDetails} />

      <div>
        <p>Find out everything about any champion: skills, cooldowns, stats, lore, and skins.</p>
        <Link to="/champions">Go to champions</Link>
      </div>
    </div>

    <div className="players">
      <div>
        <p>Check a player's leagues, highest mastery champions, summoner level, and recent match history.</p>
        <Link to="/players">Go to players</Link>
      </div>

      <img className="matchDetails" src={matchDetails} />
    </div>
  </div>
);

export default Home;
