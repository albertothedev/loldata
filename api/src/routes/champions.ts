import express from "express";
import axios, { AxiosError, AxiosResponse } from "axios";

module.exports = (app: express.Application) =>
  app.post("/champions", (req: express.Request, res: express.Response) =>
    axios
      .get(`http://ddragon.leagueoflegends.com/cdn/12.4.1/data/${req.body.code}/champion.json`)
      .then((response: AxiosResponse) => {
        // console.log("Server response");
        res.send(response.data.data);
      })
      .catch((error: AxiosError) => {
        // console.log("Server error");
        // console.error(error);
      })
  );
