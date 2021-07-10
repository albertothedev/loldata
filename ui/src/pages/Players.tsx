import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

import Match from "../components/Match";
import defaultPlayer from "../assets/defaultPlayer.json";
import PlayersNavBar from "../components/PlayersNavBar";

import bronze from "../assets/ranked-emblems/bronze.png";
import challenger from "../assets/ranked-emblems/challenger.png";
import diamond from "../assets/ranked-emblems/diamond.png";
import gold from "../assets/ranked-emblems/gold.png";
import grandmaster from "../assets/ranked-emblems/grandmaster.png";
import iron from "../assets/ranked-emblems/iron.png";
import master from "../assets/ranked-emblems/master.png";
import platinum from "../assets/ranked-emblems/platinum.png";
import silver from "../assets/ranked-emblems/silver.png";
import unranked from "../assets/ranked-emblems/unranked.png";

const Players = (): JSX.Element => {
  const [player, setPlayer] = useState<any>(defaultPlayer);

  const rankedEmblems: any = {
    silver,
    bronze,
    challenger,
    diamond,
    grandmaster,
    iron,
    master,
    platinum,
    gold,
  };

  const addDots = (string: string) => Number(string).toLocaleString().replace(/,/g, ".");

  const searchPlayer = (playerName: string, regionCode: any) =>
    axios
      .post(`${process.env.REACT_APP_LOLDATA_API_URL}/player`, {
        playerName,
        regionCode,
      })
      .then((res: AxiosResponse) => setPlayer(res.data))
      .catch((error: AxiosError) => console.error(error));

  return (
    <div className="players">
      <PlayersNavBar searchPlayer={(playerName: any, regionCode: any) => searchPlayer(playerName, regionCode)} />

      <div className="players__player">
        {player && (
          <div className="players__player__profile">
            <div className="players__player__profile__icon">
              <img
                src={`https://cdn.communitydragon.org/latest/profile-icon/${player.profileIconId}`}
                className="players__player__profile__icon__image"
              />
              <span className="players__player__profile__icon__level">{player.summonerLevel}</span>
            </div>

            <h1 className="players__player__profile__name">{player.name}</h1>

            {player.leagues.solo && (
              <img src={rankedEmblems[player.leagues.solo.tier.toLowerCase()]} className="players__player__profile__rankedSoloImage" />
            )}
            {!player.leagues.solo && <img src={unranked} className="players__player__profile__rankedSoloImage" />}

            {player.leagues.solo && (
              <div className="players__player__profile__rankedSoloData">
                <span>Ranked Solo/Duo</span>
                <span className="players__player__profile__rankedSoloData__tierDetails">
                  {`${player.leagues.solo.tier} ${player.leagues.solo.rank} ${player.leagues.solo.leaguePoints} LP`}
                </span>
                <span>{`${player.leagues.solo.wins + player.leagues.solo.losses} games`}</span>
                <span>{`${player.leagues.solo.wins} wins ${player.leagues.solo.losses} losses`}</span>
                <span>{`${Math.round((player.leagues.solo.wins / (player.leagues.solo.wins + player.leagues.solo.losses)) * 100)}% win ratio`}</span>
              </div>
            )}
            {!player.leagues.solo && (
              <div className="players__player__profile__rankedSoloData">
                <span>Ranked Solo/Duo</span>
                <span>Not enough information</span>
              </div>
            )}

            {player.leagues.flex && (
              <img src={rankedEmblems[player.leagues.flex.tier.toLowerCase()]} className="players__player__profile__rankedFlexImage" />
            )}
            {!player.leagues.flex && <img src={unranked} className="players__player__profile__rankedFlexImage" />}

            {player.leagues.flex && (
              <div className="players__player__profile__rankedFlexData">
                <span>Ranked Flex</span>
                <span className="players__player__profile__rankedFlexData__tierDetails">
                  {`${player.leagues.flex.tier} ${player.leagues.flex.rank} ${player.leagues.flex.leaguePoints} LP`}
                </span>
                <span>{`${player.leagues.flex.wins + player.leagues.flex.losses} games`}</span>
                <span>{`${player.leagues.flex.wins} wins ${player.leagues.flex.losses} losses`}</span>
                <span>{`${Math.round((player.leagues.flex.wins / (player.leagues.flex.wins + player.leagues.flex.losses)) * 100)}% win ratio`}</span>
              </div>
            )}
            {!player.leagues.flex && (
              <div className="players__player__profile__rankedFlexData">
                <span>Ranked Flex</span>
                <span>Not enough information</span>
              </div>
            )}

            {player.championMastery.map((champion: any, i: any) => (
              <div className={`players__player__profile__championMastery${i + 1}`} key={i}>
                <div className={`players__player__profile__championMastery${i + 1}__icon`}>
                  <img
                    src={`https://cdn.communitydragon.org/latest/champion/${champion.championId}/square`}
                    className={`players__player__profile__championMastery${i + 1}__icon__image`}
                  />
                  <span className={`players__player__profile__championMastery${i + 1}__icon__level`}>{champion.championLevel}</span>
                </div>
                <span className={`players__player__profile__championMastery${i + 1}__icon__points`}>{addDots(champion.championPoints)}</span>
              </div>
            ))}
          </div>
        )}
        {player.matches.map((match: any, i: any) => (
          <Match match={match} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Players;
