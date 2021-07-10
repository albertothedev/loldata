import express from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { TPlayer } from "../types/index";

const config = {
  headers: {
    "X-Riot-Token": process.env.LOLDATA_API_KEY,
  },
};
const maxMatches = 5;

module.exports = (app: express.Application) =>
  app.post("/player", (req: express.Request, expressRes: express.Response) => {
    let player: TPlayer = {
      puuid: null,
      name: null,
      tagLine: null,
      id: null,
      accountId: null,
      profileIconId: null,
      summonerLevel: null,
      leagues: {
        solo: null,
        flex: null,
      },
      championMastery: null,
      matches: [],
    };

    let matchObject: any = null;

    axios
      .get(`https://${req.body.regionCode}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.playerName}`, config)
      .then((res: AxiosResponse) => {
        player.puuid = res.data.puuid;
        player.name = res.data.name;
        player.id = res.data.id;
        player.accountId = res.data.accountId;
        player.profileIconId = res.data.profileIconId;
        player.summonerLevel = res.data.summonerLevel;

        axios
          .get(`https://${req.body.regionCode}.api.riotgames.com/lol/league/v4/entries/by-summoner/${player.id}`, config)
          .then((res: AxiosResponse) =>
            res.data.forEach((league: any) =>
              league.queueType === "RANKED_SOLO_5x5" ? (player.leagues.solo = league) : (player.leagues.flex = league)
            )
          )
          .catch((error: AxiosError) => console.error(error));

        axios
          .get(`https://${req.body.regionCode}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${player.id}`, config)
          .then((res: AxiosResponse) => (player.championMastery = res.data.slice(0, 3)))
          .catch((error: AxiosError) => console.error(error));

        axios
          .get(
            `https://${req.body.regionCode}.api.riotgames.com/lol/match/v4/matchlists/by-account/${player.accountId}?endIndex=${maxMatches}`,
            config
          )
          .then((res: AxiosResponse) => {
            let indexExample = 0;

            res.data.matches.forEach(async (match: any, index: any) => {
              await axios
                .get(`https://${req.body.regionCode}.api.riotgames.com/lol/match/v4/matches/${match.gameId}`, config)
                .then((res2: AxiosResponse) => {
                  indexExample++;

                  matchObject = {
                    gameId: match.gameId,
                    platformId: match.platformId,
                    queue: match.queue,
                    season: match.season,
                    timestamp: match.timestamp,
                    gameType: res2.data.gameType,
                    gameDuration: res2.data.gameDuration,
                    mapId: res2.data.mapId,
                    gameMode: res2.data.gameMode,
                    teams: [
                      {
                        inhibitorKills: res2.data.teams[0].inhibitorKills,
                        towerKills: res2.data.teams[0].towerKills,
                        riftHeraldKills: res2.data.teams[0].riftHeraldKills,
                        dragonKills: res2.data.teams[0].dragonKills,
                        baronKills: res2.data.teams[0].baronKills,
                        teamId: res2.data.teams[0].teamId,
                        bans: res2.data.teams[0].bans,
                        participants: [],
                      },
                      {
                        inhibitorKills: res2.data.teams[1].inhibitorKills,
                        towerKills: res2.data.teams[1].towerKills,
                        riftHeraldKills: res2.data.teams[1].riftHeraldKills,
                        dragonKills: res2.data.teams[1].dragonKills,
                        baronKills: res2.data.teams[1].baronKills,
                        teamId: res2.data.teams[1].teamId,
                        bans: res2.data.teams[1].bans,
                        participants: [],
                      },
                    ],
                    participants: [],
                  };

                  res2.data.participants.forEach((participant: any, index2: any) => {
                    if (res2.data.participantIdentities[index2].player.summonerName === player.name) {
                      matchObject.playerStats = {
                        role: match.role,
                        championId: match.champion,
                        lane: match.lane,
                        kills: participant.stats.kills,
                        assists: participant.stats.assists,
                        deaths: participant.stats.deaths,
                        championLevel: participant.stats.champLevel,
                        trinket: participant.stats.item6,
                        CS: participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled,
                        perkPrimaryStyle: participant.stats.perkPrimaryStyle,
                        totalDamageTaken: participant.stats.totalDamageTaken,
                        totalDamageDealtToChampions: participant.stats.totalDamageDealtToChampions,
                        totalHeal: participant.stats.totalHeal,
                        wardsKilled: participant.stats.wardsKilled,
                        wardsPlaced: participant.stats.wardsPlaced,
                        visionWardsBoughtInGame: participant.stats.visionWardsBoughtInGame,
                        sightWardsBoughtInGame: participant.stats.sightWardsBoughtInGame,
                        visionScore: participant.stats.visionScore,
                        summonerSpellIds: [participant.spell1Id, participant.spell2Id],
                        itemIds: [
                          participant.stats.item0,
                          participant.stats.item1,
                          participant.stats.item2,
                          participant.stats.item3,
                          participant.stats.item4,
                          participant.stats.item5,
                        ],
                        perkSecondaryStyle: participant.stats.perkSubStyle,
                        statPerkIds: [participant.stats.statPerk0, participant.stats.statPerk1, participant.stats.statPerk2],
                        primaryPerkIds: [participant.stats.perk0, participant.stats.perk1, participant.stats.perk2, participant.stats.perk3],
                        secondaryPerkIds: [participant.stats.perk4, participant.stats.perk5],
                        goldEarned: participant.stats.goldEarned,
                        neutralMinionsKilled: participant.stats.neutralMinionsKilled,
                        totalMinionsKilled: participant.stats.totalMinionsKilled,
                        firstBlood: participant.stats.firstBloodKill,
                      };

                      matchObject.win = participant.stats.win;
                    }

                    matchObject.teams[participant.teamId === 100 ? 0 : 1].participants.push({
                      participantId: participant.participantId,
                      profileIcon: res2.data.participantIdentities[index2].player.profileIcon,
                      accountId: res2.data.participantIdentities[index2].player.accountId,
                      matchHistoryUri: res2.data.participantIdentities[index2].player.matchHistoryUri,
                      currentAccountId: res2.data.participantIdentities[index2].player.currentAccountId,
                      currentPlatformId: res2.data.participantIdentities[index2].player.currentPlatformId,
                      summonerName: res2.data.participantIdentities[index2].player.summonerName,
                      summonerId: res2.data.participantIdentities[index2].player.summonerId,
                      platformId: res2.data.participantIdentities[index2].player.platformId,
                      championId: participant.championId,
                      teamId: participant.teamId,
                      highestAchievedSeasonTier: participant.highestAchievedSeasonTier,
                      runes: participant.runes,
                      masteries: participant.masteries,
                      summonerSpellIds: [participant.spell1Id, participant.spell2Id],
                      kills: participant.stats.kills,
                      deaths: participant.stats.deaths,
                      assists: participant.stats.assists,
                      championLevel: participant.stats.champLevel,
                      itemIds: [
                        participant.stats.item0,
                        participant.stats.item1,
                        participant.stats.item2,
                        participant.stats.item3,
                        participant.stats.item4,
                        participant.stats.item5,
                      ],
                      trinket: participant.stats.item6,
                      CS: participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled,
                      perkPrimaryStyle: participant.stats.perkPrimaryStyle,
                      perkSecondaryStyle: participant.stats.perkSubStyle,
                      statPerkIds: [participant.stats.statPerk0, participant.stats.statPerk1, participant.stats.statPerk2],
                      primaryPerkIds: [participant.stats.perk0, participant.stats.perk1, participant.stats.perk2, participant.stats.perk3],
                      secondaryPerkIds: [participant.stats.perk4, participant.stats.perk5],
                      goldEarned: participant.stats.goldEarned,
                      totalDamageTaken: participant.stats.totalDamageTaken,
                      neutralMinionsKilled: participant.stats.neutralMinionsKilled,
                      wardsKilled: participant.stats.wardsKilled,
                      wardsPlaced: participant.stats.wardsPlaced,
                      totalDamageDealtToChampions: participant.stats.totalDamageDealtToChampions,
                      totalMinionsKilled: participant.stats.totalMinionsKilled,
                      visionWardsBoughtInGame: participant.stats.visionWardsBoughtInGame,
                      totalHeal: participant.stats.totalHeal,
                      firstBlood: participant.stats.firstBloodKill,
                      sightWardsBoughtInGame: participant.stats.sightWardsBoughtInGame,
                      visionScore: participant.stats.visionScore,
                    });
                  });

                  player.matches[index] = matchObject;
                })
                .catch((error: AxiosError) => console.error(error));

              if (indexExample === maxMatches) expressRes.send(player);
            });
          })
          .catch((error: AxiosError) => console.error(error));
      })
      .catch((error: AxiosError) => console.error(error));
  });
