import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { languages } from "../assets/languages.json";
import { setLanguage, RootState, setMode } from "../redux";

type ChampionsNavBarProps = {
  searchChampion: any;
};

const ChampionsNavBar = ({
  searchChampion,
}: ChampionsNavBarProps): JSX.Element => {
  const dispatch = useDispatch();

  const { language } = useSelector((state: RootState) => state);

  return (
    <nav className="championsNavBar">
      <div className="championsNavBar__search">
        <h1 className="championsNavBar__search__title">LOLDATA</h1>
        <input
          className="championsNavBar__search__champion"
          type="text"
          onChange={(e: any) => searchChampion(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div className="championsNavBar__links">
        <NavLink
          to="/champions"
          className="championsNavBar__links__link"
          activeClassName="championsNavBar__links__link--active"
          onClick={() => dispatch(setMode("champions"))}
        >
          CHAMPIONS
        </NavLink>
        <NavLink
          to="/players"
          className="championsNavBar__links__link"
          activeClassName="championsNavBar__links__link--active"
          onClick={() => dispatch(setMode("players"))}
        >
          PLAYERS
        </NavLink>
      </div>

      <div className="championsNavBar__languageSelector">
        <button className="championsNavBar__languageSelector__button">
          {language.name} ({language.region})
        </button>
        <ul className="championsNavBar__languageSelector__languages">
          {languages.map((language2: any, index: any) => (
            <li
              key={index}
              className={`championsNavBar__languageSelector__languages__language ${
                language2.code === language.code
                  ? "championsNavBar__languageSelector__languages__language--active"
                  : ""
              }`}
              onClick={() => dispatch(setLanguage(language2))}
            >
              <span className="championsNavBar__languageSelector__languages__language__name">
                {language2.name}
              </span>
              <span className="championsNavBar__languageSelector__languages__language__region">
                {language2.region}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default ChampionsNavBar;
