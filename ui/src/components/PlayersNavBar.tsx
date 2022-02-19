import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setRegion, RootState, setMode } from "../redux";

type PlayersNavBarProps = {
  searchChampion?: any;
  searchPlayer?: any;
};

const PlayersNavBar = ({ searchPlayer }: PlayersNavBarProps): JSX.Element => {
  const dispatch = useDispatch();

  const { region } = useSelector((state: RootState) => state);

  const regions = [
    { acronym: "NA", code: "na1" },
    { acronym: "KR", code: "kr" },
    { acronym: "EUW", code: "euw1" },
    { acronym: "EUN", code: "eun1" },
    { acronym: "BR", code: "br1" },
    { acronym: "JP", code: "jp1" },
    { acronym: "OC", code: "oc1" },
    { acronym: "TR", code: "tr1" },
    { acronym: "LAN", code: "la1" },
    { acronym: "LAS", code: "la2" },
    { acronym: "RU", code: "ru" },
  ];

  return (
    <nav className="playersNavBar">
      <div className="playersNavBar__search">
        <h1 className="playersNavBar__search__title">LOLDATA</h1>

        <form
          className="playersNavBar__search__form"
          onSubmit={(e: any) => {
            e.preventDefault();
            searchPlayer(e.target[0].value, region.code);
          }}
        >
          <input className="playersNavBar__search__form__player" type="text" placeholder="Search" name="player" required />

          <button className="playersNavBar__search__form__submit">GO</button>
        </form>

        <div className="playersNavBar__search__regionSelector">
          <button className="playersNavBar__search__regionSelector__button">{region.acronym}</button>
          <ul className="playersNavBar__search__regionSelector__regions">
            {regions.map((region2: any, index: any) => (
              <li
                className={`playersNavBar__search__regionSelector__regions__region ${
                  region2.code === region.code ? "playersNavBar__search__regionSelector__regions__region--active" : ""
                }`}
                key={index}
                onClick={() => dispatch(setRegion(region2))}
              >
                <span className="playersNavBar__search__regionSelector__regions__region__acronym">{region2.acronym}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="playersNavBar__links">
        <NavLink
          to="/champions"
          className={({ isActive }) => "playersNavBar__links__link" + (isActive ? " playersNavBar__links__link--active" : "")}
          onClick={() => dispatch(setMode("champions"))}
        >
          CHAMPIONS
        </NavLink>
        <NavLink
          to="/players"
          className={({ isActive }) => "playersNavBar__links__link" + (isActive ? " playersNavBar__links__link--active" : "")}
          onClick={() => dispatch(setMode("players"))}
        >
          PLAYERS
        </NavLink>
      </div>
    </nav>
  );
};
export default PlayersNavBar;
