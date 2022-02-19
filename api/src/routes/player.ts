import express from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

import { TPlayer } from "../types/index";

const config = {
  headers: {
    "X-Riot-Token": process.env.LOLDATA_API_KEY as string,
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

        let regionName: "americas" | "europe" | "asia" | null = null;

        switch (req.body.regionCode) {
          case "oc1" || "na1" || "br1" || "la1" || "la2":
            regionName = "americas";
            break;

          case "euw1" || "eun1" || "ru" || "tr1":
            regionName = "europe";
            break;

          case "jp1" || "kr":
            regionName = "asia";
            break;
        }

        axios
          .get(`https://${regionName}.api.riotgames.com/lol/match/v5/matches/by-puuid/${player.puuid}/ids?count=${maxMatches}`, config)
          .then((res: AxiosResponse) => {
            let indexExample = 0;

            res.data.forEach(async (match: any, index: any) => {
              await axios
                .get(`https://${regionName}.api.riotgames.com/lol/match/v5/matches/${match}`, config)
                .then((res2: AxiosResponse) => {
                  indexExample++;

                  matchObject = {
                    gameId: match.gameId,
                    platformId: match.platformId,
                    queue: match.queue,
                    season: match.season,
                    timestamp: res2.data.info.gameCreation,
                    gameType: res2.data.info.gameType,
                    gameDuration: res2.data.info.gameDuration / 1000,
                    mapId: res2.data.info.mapId,
                    gameMode: res2.data.info.gameMode,
                    teams: [
                      {
                        inhibitorKills: res2.data.info.teams[0].inhibitorKills,
                        towerKills: res2.data.info.teams[0].towerKills,
                        riftHeraldKills: res2.data.info.teams[0].riftHeraldKills,
                        dragonKills: res2.data.info.teams[0].dragonKills,
                        baronKills: res2.data.info.teams[0].baronKills,
                        teamId: res2.data.info.teams[0].teamId,
                        bans: res2.data.info.teams[0].bans,
                        participants: [],
                      },
                      {
                        inhibitorKills: res2.data.info.teams[1].inhibitorKills,
                        towerKills: res2.data.info.teams[1].towerKills,
                        riftHeraldKills: res2.data.info.teams[1].riftHeraldKills,
                        dragonKills: res2.data.info.teams[1].dragonKills,
                        baronKills: res2.data.info.teams[1].baronKills,
                        teamId: res2.data.info.teams[1].teamId,
                        bans: res2.data.info.teams[1].bans,
                        participants: [],
                      },
                    ],
                    participants: [],
                  };

                  res2.data.info.participants.forEach((participant: any, index2: any) => {
                    if (participant.summonerName === player.name) {
                      matchObject.playerStats = {
                        role: participant.role,
                        championId: participant.championId,
                        lane: participant.lane,
                        kills: participant.kills,
                        assists: participant.assists,
                        deaths: participant.deaths,
                        championLevel: participant.champLevel,
                        trinket: participant.item6,
                        CS: participant.totalMinionsKilled + participant.neutralMinionsKilled,
                        totalDamageTaken: participant.totalDamageTaken,
                        totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
                        totalHeal: participant.totalHeal,
                        wardsKilled: participant.wardsKilled,
                        wardsPlaced: participant.wardsPlaced,
                        visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
                        sightWardsBoughtInGame: participant.sightWardsBoughtInGame,
                        visionScore: participant.visionScore,
                        summonerSpellIds: [participant.summoner1Id, participant.summoner2Id],
                        itemIds: [participant.item0, participant.item1, participant.item2, participant.item3, participant.item4, participant.item5],
                        perkPrimaryStyle: participant.perks.styles[0].style,
                        perkSecondaryStyle: participant.perks.styles[1].style,
                        statPerkIds: [participant.perks.statPerks.offense, participant.perks.statPerks.flex, participant.perks.statPerks.defense],
                        primaryPerkIds: [
                          participant.perks.styles[0].selections[0].perk,
                          participant.perks.styles[0].selections[1].perk,
                          participant.perks.styles[0].selections[2].perk,
                          participant.perks.styles[0].selections[3].perk,
                        ],
                        secondaryPerkIds: [participant.perks.styles[1].selections[0].perk, participant.perks.styles[1].selections[1].perk],
                        goldEarned: participant.goldEarned,
                        neutralMinionsKilled: participant.neutralMinionsKilled,
                        totalMinionsKilled: participant.totalMinionsKilled,
                        firstBlood: participant.firstBloodKill,
                      };

                      matchObject.win = participant.win;
                    }

                    matchObject.teams[participant.teamId === 100 ? 0 : 1].participants.push({
                      participantId: participant.participantId,
                      profileIcon: participant.profileIcon,
                      accountId: participant.accountId,
                      matchHistoryUri: participant.matchHistoryUri,
                      currentAccountId: participant.currentAccountId,
                      currentPlatformId: participant.currentPlatformId,
                      summonerName: participant.summonerName,
                      summonerId: participant.summonerId,
                      platformId: participant.platformId,
                      championId: participant.championId,
                      teamId: participant.teamId,
                      highestAchievedSeasonTier: participant.highestAchievedSeasonTier,
                      runes: participant.runes,
                      masteries: participant.masteries,
                      summonerSpellIds: [participant.summoner1Id, participant.summoner2Id],
                      kills: participant.kills,
                      deaths: participant.deaths,
                      assists: participant.assists,
                      championLevel: participant.champLevel,
                      itemIds: [participant.item0, participant.item1, participant.item2, participant.item3, participant.item4, participant.item5],
                      trinket: participant.item6,
                      CS: participant.totalMinionsKilled + participant.neutralMinionsKilled,
                      perkPrimaryStyle: participant.perks.styles[0].style,
                      perkSecondaryStyle: participant.perks.styles[1].style,
                      statPerkIds: [participant.perks.statPerks.offense, participant.perks.statPerks.flex, participant.perks.statPerks.defense],
                      primaryPerkIds: [
                        participant.perks.styles[0].selections[0].perk,
                        participant.perks.styles[0].selections[1].perk,
                        participant.perks.styles[0].selections[2].perk,
                        participant.perks.styles[0].selections[3].perk,
                      ],
                      secondaryPerkIds: [participant.perks.styles[1].selections[0].perk, participant.perks.styles[1].selections[1].perk],
                      goldEarned: participant.goldEarned,
                      totalDamageTaken: participant.totalDamageTaken,
                      neutralMinionsKilled: participant.neutralMinionsKilled,
                      wardsKilled: participant.wardsKilled,
                      wardsPlaced: participant.wardsPlaced,
                      totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
                      totalMinionsKilled: participant.totalMinionsKilled,
                      visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
                      totalHeal: participant.totalHeal,
                      firstBlood: participant.firstBloodKill,
                      sightWardsBoughtInGame: participant.sightWardsBoughtInGame,
                      visionScore: participant.visionScore,
                    });
                  });

                  player.matches[index] = matchObject;
                })
                .catch((error: AxiosError) => console.error(error));

              if (indexExample === maxMatches) expressRes.send(player);
            });
          });
      })
      .catch((error: AxiosError) => console.error(error));
  });
