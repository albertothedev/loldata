import express from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

module.exports = (app: express.Application) =>
  app.post("/champion", (req: express.Request, res: express.Response) =>
    axios
      .get(`http://ddragon.leagueoflegends.com/cdn/11.10.1/data/${req.body.code}/champion/${req.body.championId}.json`)
      .then((response: AxiosResponse) => {
        let data = {
          ...response.data.data[req.body.championId],
          abilities: [response.data.data[req.body.championId].passive, ...response.data.data[req.body.championId].spells],
        };

        res.send(data);
      })
      .catch((error: AxiosError) => console.error(error))
  );
