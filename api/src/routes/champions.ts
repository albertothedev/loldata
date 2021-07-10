import express from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

module.exports = (app: express.Application) =>
  app.post("/champions", (req: express.Request, res: express.Response) =>
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/11.10.1/data/${req.body.code}/champion.json`
      )
      .then((response: AxiosResponse) => res.send(response.data.data))
      .catch((error: AxiosError) => console.error(error))
  );
