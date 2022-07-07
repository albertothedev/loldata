import express from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

module.exports = (app: express.Application) =>
  app.post("/champion", (req: express.Request, res: express.Response) => {
    console.log(
      "/champion",
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/${req.body.code}/v1/champions/${req.body.championId}.json`
    );
    axios
      // .get(`http://ddragon.leagueoflegends.com/cdn/12.4.1/data/${req.body.code}/champion/${req.body.championId}.json`)
      .get(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/${req.body.code}/v1/champions/${req.body.championId}.json`)
      .then((response: AxiosResponse) => {
        console.log("Server response", response.data);

        // let data = {
        //   ...response.data.data[req.body.championId],
        //   abilities: [response.data.data[req.body.championId].passive, ...response.data.data[req.body.championId].spells],
        // };

        // res.send(data);
        res.send(response.data);
      })
      .catch((error: AxiosError) => {
        console.log("Server error");

        // console.error(error);
      });
  });
