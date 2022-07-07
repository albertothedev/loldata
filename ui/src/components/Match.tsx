import baron100 from "../assets/teams/baron-100.png";
import baron200 from "../assets/teams/baron-200.png";
import dragon100 from "../assets/teams/dragon-100.png";
import dragon200 from "../assets/teams/dragon-200.png";
import herald100 from "../assets/teams/herald-100.png";
import herald200 from "../assets/teams/herald-200.png";
import inhibitor100 from "../assets/teams/inhibitor-100.png";
import inhibitor200 from "../assets/teams/inhibitor-200.png";
import tower100 from "../assets/teams/tower-100.png";
import tower200 from "../assets/teams/tower-200.png";

type MatchProps = {
  match: any;
  perks2: any;
  summonerSpells2: any;
  items2: any;
};

const Match = ({ match, perks2, summonerSpells2, items2 }: MatchProps): JSX.Element => {
  const minTommss = (minutes: any): any => {
    var sign = minutes < 0 ? "-" : "";
    var min = Math.floor(Math.abs(minutes));
    var sec = Math.floor((Math.abs(minutes) * 60) % 60);
    return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
  };

  const abbreviateNumber = (value: any) => {
    var newValue: any = value;

    if (value >= 1000) {
      var suffixes: any = ["", "k", "m", "b", "t"];
      var suffixNum: any = Math.floor(("" + value).length / 3);
      var shortValue: any = "";

      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision));
        var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  };

  const mapJsonPathToCdragonUrl = (path: string): string =>
    `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${path.split("/lol-game-data/assets/")[1].toLowerCase()}`;

  const findPerkDetails = (perkId: string, perkKey: "shortDesc" | "name" | "iconPath"): string =>
    perks2.find((perk2: any) => perk2.id === perkId)[perkKey];

  const findSummonerSpellDetails = (summonerSpellId: string, summonerSpellKey: "shortDesc" | "name" | "iconPath"): string =>
    summonerSpells2.find((summonerSpell2: any) => summonerSpell2.id === summonerSpellId)[summonerSpellKey];

  const findItemDetails = (itemId: string, itemKey: "shortDesc" | "name" | "iconPath"): string =>
    items2.find((item2: any) => item2.id === itemId)[itemKey];

  return (
    <div className="match">
      <h1 className={"match__matchResult " + (match.win ? "match__matchResult--victory" : "match__matchResult--defeat")}>
        {match.win ? "VICTORY" : "DEFEAT"}
      </h1>

      <div className="match__player">
        <div className="match__player__champion">
          <img
            src={`https://cdn.communitydragon.org/latest/champion/${match.playerStats.championId}/square`}
            className="match__player__champion__image"
          />
          <span className="match__player__champion__level">{match.playerStats.championLevel}</span>
        </div>

        <span className="match__player__header match__player__header--time">Time</span>
        <span className="match__player__matchDuration">{`${minTommss(match.gameDuration / 60)} minutes`}</span>
        <span className="match__player__matchDate">
          {new Date(match.timestamp).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>

        <span className="match__player__header match__player__header--KDA">KDA</span>
        <span className="match__player__KDAData">{`${match.playerStats.kills} / ${match.playerStats.deaths} / ${match.playerStats.assists}`}</span>
        <span className="match__player__KDARatio">
          {`${((match.playerStats.kills + match.playerStats.assists) / match.playerStats.deaths).toFixed(2)} KDA`}
        </span>

        <span className="match__player__header match__player__header--CS">CS</span>
        <span className="match__player__CSTotal">{`${match.playerStats.CS} CS`}</span>
        <span className="match__player__CSPerMinute">{`${(match.playerStats.CS / (match.gameDuration / 60)).toFixed(1)} CS/min`}</span>

        <span className="match__player__header match__player__header--vision">Vision</span>
        <span className="match__player__visionScore">{`${match.playerStats.visionScore} Score`}</span>
        <span className="match__player__visionData">
          {`${match.playerStats.wardsPlaced ? match.playerStats.wardsPlaced : "0"}|${
            match.playerStats.wardsKilled ? match.playerStats.wardsKilled : "0"
          }`}
        </span>

        <span className="match__player__header match__player__header--damage">Damage</span>
        <span className="match__player__damageDealt">{`${abbreviateNumber(match.playerStats.totalDamageDealtToChampions)} Dealt`}</span>
        <span className="match__player__damageTaken">{`${abbreviateNumber(match.playerStats.totalDamageTaken)} Taken`}</span>

        {match.playerStats.summonerSpellIds.map((summonerSpellId: any, i: any) =>
          summonerSpellId ? (
            <img
              className={`match__player__spell${i + 1}`}
              src={mapJsonPathToCdragonUrl(findSummonerSpellDetails(summonerSpellId, "iconPath"))}
              key={i}
            />
          ) : (
            <span className={`match__player__spell${i + 1} match__player__spell${i + 1}--missing`} key={i}></span>
          )
        )}

        {match.playerStats.itemIds.map((itemId: any, i: any) =>
          itemId ? (
            <img src={mapJsonPathToCdragonUrl(findItemDetails(itemId, "iconPath"))} className={`match__player__item${i + 1}`} key={i} />
          ) : (
            <span className={`match__player__item${i + 1} match__player__item${i + 1}--missing`} key={i}></span>
          )
        )}

        {match.playerStats.trinket ? (
          <img src={mapJsonPathToCdragonUrl(findItemDetails(match.playerStats.trinket, "iconPath"))} className="match__player__trinket" />
        ) : (
          <span className="match__player__trinket match__player__trinket--missing"></span>
        )}

        {match.playerStats.primaryPerkIds.map((primaryPerkId: any, i: any) =>
          match.playerStats.perkPrimaryStyle && primaryPerkId ? (
            <img
              src={mapJsonPathToCdragonUrl(findPerkDetails(primaryPerkId, "iconPath"))}
              title={`${findPerkDetails(primaryPerkId, "name")}: ${findPerkDetails(primaryPerkId, "shortDesc")}`}
              className={`match__player__primaryPerk${i + 1}`}
              key={i}
            />
          ) : (
            <span className={`match__player__primaryPerk${i + 1} match__player__primaryPerk${i + 1}--missing`} key={i}></span>
          )
        )}

        {match.playerStats.secondaryPerkIds.map((secondaryPerkId: any, i: any) =>
          match.playerStats.perkSecondaryStyle && secondaryPerkId ? (
            <img
              src={mapJsonPathToCdragonUrl(findPerkDetails(secondaryPerkId, "iconPath"))}
              title={`${findPerkDetails(secondaryPerkId, "name")}: ${findPerkDetails(secondaryPerkId, "shortDesc")}`}
              className={`match__player__secondaryPerk${i + 1}`}
              key={i}
            />
          ) : (
            <span className={`match__player__secondaryPerk${i + 1} match__player__secondaryPerk${i + 1}--missing`} key={i}></span>
          )
        )}

        {match.playerStats.statPerkIds.map((statPerkId: any, i: any) =>
          statPerkId ? (
            <img
              src={mapJsonPathToCdragonUrl(findPerkDetails(statPerkId, "iconPath"))}
              title={`${findPerkDetails(statPerkId, "name")}: ${findPerkDetails(statPerkId, "shortDesc")}`}
              className={`match__player__statPerk${i + 1}`}
              key={i}
            />
          ) : (
            <span className={`match__player__statPerk${i + 1} match__player__statPerk${i + 1}--missing`} key={i}></span>
          )
        )}
      </div>

      <div className="match__teams">
        {match.teams.map((team: any, index: number) => (
          <div className="match__teams__team" key={index}>
            <div className="match__teams__team__stats">
              <div className="match__teams__team__stats__stat match__teams__team__stats__stat__inhibitor">
                <img className="match__teams__team__stats__stat__inhibitor__image" src={`${index === 0 ? inhibitor100 : inhibitor200}`} />
                <span className="match__teams__team__stats__stat__inhibitor__kills">{team.inhibitorKills}</span>
              </div>

              <div className="match__teams__team__stats__stat match__teams__team__stats__stat__tower">
                <img className="match__teams__team__stats__stat__tower__image" src={`${index === 0 ? tower100 : tower200}`} />
                <span className="match__teams__team__stats__stat__tower__kills">{team.towerKills}</span>
              </div>

              <div className="match__teams__team__stats__stat match__teams__team__stats__stat__herald">
                <img className="match__teams__team__stats__stat__herald__image" src={`${index === 0 ? herald100 : herald200}`} />
                <span className="match__teams__team__stats__stat__herald__kills">{team.riftHeraldKills}</span>
              </div>

              <div className="match__teams__team__stats__stat match__teams__team__stats__stat__dragon">
                <img className="match__teams__team__stats__stat__dragon__image" src={`${index === 0 ? dragon100 : dragon200}`} />
                <span className="match__teams__team__stats__stat__dragon__kills">{team.dragonKills}</span>
              </div>

              <div className="match__teams__team__stats__stat match__teams__team__stats__stat__baron">
                <img className="match__teams__team__stats__stat__baron__image" src={`${index === 0 ? baron100 : baron200}`} />
                <span className="match__teams__team__stats__stat__baron__kills">{team.baronKills}</span>
              </div>

              {team.bans && team.bans.length ? (
                <div className="match__teams__team__stats__stat__bans">
                  {team.bans.map((ban: any, index: number) =>
                    ban.championId !== -1 ? (
                      <div className="match__teams__team__stats__stat__bans__ban" key={index}>
                        <img
                          className="match__teams__team__stats__stat__bans__ban__image"
                          src={`https://cdn.communitydragon.org/latest/champion/${ban.championId}/square`}
                        />
                        <div className="match__teams__team__stats__stat__bans__ban__filter">X</div>
                      </div>
                    ) : null
                  )}
                </div>
              ) : null}
            </div>

            <div className="match__teams__participants">
              {team.participants.map((participant: any, i: any) => (
                <div className="match__teams__team__participants__participant" key={i}>
                  <div className="match__teams__team__participants__participant__champion">
                    <img
                      src={`https://cdn.communitydragon.org/latest/champion/${participant.championId}/square`}
                      className="match__teams__team__participants__participant__champion__image"
                    />
                    <span className="match__teams__team__participants__participant__champion__level">{participant.championLevel}</span>
                  </div>

                  <span className="match__teams__team__participants__participant__name">
                    {participant.summonerName}
                    {participant.firstBlood && <span className="match__teams__team__participants__participant__name__firstBlood">First blood</span>}
                  </span>

                  <span className="match__teams__team__participants__participant__header match__teams__team__participants__participant__header--KDA">
                    KDA
                  </span>
                  <span className="match__teams__team__participants__participant__KDAData">
                    {`${participant.kills} / ${participant.deaths} / ${participant.assists}`}
                  </span>
                  <span className="match__teams__team__participants__participant__KDARatio">
                    {`${((participant.kills + participant.assists) / participant.deaths).toFixed(2)} KDA`}
                  </span>

                  <span className="match__teams__team__participants__participant__header match__teams__team__participants__participant__header--CS">
                    CS
                  </span>
                  <span className="match__teams__team__participants__participant__CSTotal">{`${participant.CS} CS`}</span>
                  <span className="match__teams__team__participants__participant__CSPerMinute">
                    {`${(participant.CS / (match.gameDuration / 60)).toFixed(1)} /min`}
                  </span>

                  <span className="match__teams__team__participants__participant__header match__teams__team__participants__participant__header--vision">
                    Vision
                  </span>
                  <span className="match__teams__team__participants__participant__visionScore">{`${participant.visionScore} Score`}</span>
                  <span className="match__teams__team__participants__participant__visionData">
                    {`${participant.wardsPlaced ? participant.wardsPlaced : "0"}|${participant.wardsKilled ? participant.wardsKilled : "0"}`}
                  </span>

                  <span className="match__teams__team__participants__participant__header match__teams__team__participants__participant__header--damage">
                    Damage
                  </span>
                  <span className="match__teams__team__participants__participant__damageDealt">
                    {`${abbreviateNumber(participant.totalDamageDealtToChampions)} Dealt`}
                  </span>
                  <span className="match__teams__team__participants__participant__damageTaken">
                    {`${abbreviateNumber(participant.totalDamageTaken)} Taken`}
                  </span>

                  {participant.summonerSpellIds.map((summonerSpellId: any, i: any) =>
                    summonerSpellId ? (
                      <img
                        className={`match__teams__team__participants__participant__spell${i + 1}`}
                        src={mapJsonPathToCdragonUrl(findSummonerSpellDetails(summonerSpellId, "iconPath"))}
                        key={i}
                      />
                    ) : (
                      <span
                        className={`match__teams__team__participants__participant__spell${
                          i + 1
                        } match__teams__team__participants__participant__spell${i + 1}--missing`}
                        key={i}
                      ></span>
                    )
                  )}

                  {participant.itemIds.map((itemId: any, i: any) =>
                    itemId ? (
                      <img
                        src={mapJsonPathToCdragonUrl(findItemDetails(itemId, "iconPath"))}
                        className={`match__teams__team__participants__participant__item${i + 1}`}
                        key={i}
                      />
                    ) : (
                      <span
                        className={`match__teams__team__participants__participant__item${i + 1} match__teams__team__participants__participant__item${
                          i + 1
                        }--missing`}
                        key={i}
                      ></span>
                    )
                  )}

                  {participant.trinket ? (
                    <img
                      src={mapJsonPathToCdragonUrl(findItemDetails(participant.trinket, "iconPath"))}
                      className="match__teams__team__participants__participant__trinket"
                    />
                  ) : (
                    <span className="match__teams__team__participants__participant__trinket match__teams__team__participants__participant__trinket--missing"></span>
                  )}

                  {participant.primaryPerkIds.map((primaryPerkId: any, i: any) =>
                    participant.perkPrimaryStyle && primaryPerkId ? (
                      <img
                        src={mapJsonPathToCdragonUrl(findPerkDetails(primaryPerkId, "iconPath"))}
                        title={`${findPerkDetails(primaryPerkId, "name")}: ${findPerkDetails(primaryPerkId, "shortDesc")}`}
                        className={`match__teams__team__participants__participant__primaryPerk${i + 1}`}
                        key={i}
                      />
                    ) : (
                      <span
                        className={`match__teams__team__participants__participant__primaryPerk${
                          i + 1
                        } match__teams__team__participants__participant__primaryPerk${i + 1}--missing`}
                        key={i}
                      ></span>
                    )
                  )}

                  {participant.secondaryPerkIds.map((secondaryPerkId: any, i: any) =>
                    participant.perkSecondaryStyle && secondaryPerkId ? (
                      <img
                        src={mapJsonPathToCdragonUrl(findPerkDetails(secondaryPerkId, "iconPath"))}
                        title={`${findPerkDetails(secondaryPerkId, "name")}: ${findPerkDetails(secondaryPerkId, "shortDesc")}`}
                        className={`match__teams__team__participants__participant__secondaryPerk${i + 1}`}
                        key={i}
                      />
                    ) : (
                      <span
                        className={`match__teams__team__participants__participant__secondaryPerk${
                          i + 1
                        } match__teams__team__participants__participant__secondaryPerk${i + 1}--missing`}
                        key={i}
                      ></span>
                    )
                  )}

                  {participant.statPerkIds.map((statPerkId: any, i: any) =>
                    statPerkId ? (
                      <img
                        src={mapJsonPathToCdragonUrl(findPerkDetails(statPerkId, "iconPath"))}
                        title={`${findPerkDetails(statPerkId, "name")}: ${findPerkDetails(statPerkId, "shortDesc")}`}
                        className={`match__teams__team__participants__participant__statPerk${i + 1}`}
                        key={i}
                      />
                    ) : (
                      <span
                        className={`match__teams__team__participants__participant__statPerk${
                          i + 1
                        } match__teams__team__participants__participant__statPerk${i + 1}--missing`}
                        key={i}
                      ></span>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Match;
