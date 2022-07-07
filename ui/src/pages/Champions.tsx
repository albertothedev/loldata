import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux";
import { TChampionDescription, TChampionDetails } from "../types/index";
import Modal from "../components/Modal";
import ChampionsNavBar from "../components/ChampionsNavBar";

const Champions = (): JSX.Element => {
  const { language } = useSelector((state: RootState) => state);

  const [champions, setChampions] = useState<Array<TChampionDescription>>([]);
  const [champions2, setChampions2] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredChampions, setFilteredChampions] = useState<Array<TChampionDescription> | null>(null);
  const [filteredChampions2, setFilteredChampions2] = useState<any>();
  const [modal, setModal] = useState<TChampionDetails | null>(null);

  useEffect(() => {
    console.log(language.code);
    axios
      .post(`${process.env.REACT_APP_LOLDATA_API_URL}/champions`, {
        code: language.code,
      })
      .then((res: AxiosResponse) => {
        setChampions(Object.values(res.data));
        setFilteredChampions(Object.values(res.data));
        console.log(res.data);
      });
  }, [language]);

  useEffect(() => {
    (async () => {
      console.log("HI");

      const championsResponse = await fetch(
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/${language.code || "default"}/v1/champion-summary.json`
      );
      const championsResponseParsed = await championsResponse.json();
      championsResponseParsed.shift();
      // console.log(championsResponseParsed);
      // console.log(championsResponseParsed[0].id);
      // console.log(
      //   `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championsResponseParsed[0].id}/${
      //     championsResponseParsed[0].id + "000"
      //   }.jpg`
      // );
      setChampions2(championsResponseParsed.sort((a: any, b: any) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)));
      setFilteredChampions2(championsResponseParsed);

      setLoading(false);
    })();
  }, [language]);

  const searchChampion = (value: string) =>
    setFilteredChampions2(Object.values(champions2).filter((champion: any) => champion.name.toLowerCase().startsWith(value.toLowerCase())));

  const openModal = (championId: string): void => {
    console.log("openModal()", championId);
    axios
      .post(`${process.env.REACT_APP_LOLDATA_API_URL}/champion`, {
        code: language.code,
        championId,
      })
      .then((res: AxiosResponse) => {
        console.log("Client response", res.data);
        setModal(res.data);
      })
      .catch((error: AxiosError) => {
        console.log("Client error");
        console.error(error);
      });
  };

  return (
    <div className="championsContainer">
      <ChampionsNavBar searchChampion={(value: any) => searchChampion(value)} />

      <div className="champions">
        {!loading &&
          filteredChampions2.map((champion: any, index: any) => (
            <div className="champions__champion" onClick={() => openModal(champion.id)} key={index}>
              <div className="champions__champion__filter">
                <span
                  className="champions__champion__filter__name"
                  style={{
                    backgroundImage: `url(https://cdn.communitydragon.org/latest/champion/${champion.id}/portrait)`,
                    backgroundPosition: "center",
                  }}
                >
                  {champion.name.toUpperCase()}
                </span>
              </div>

              <img
                className="champions__champion__image"
                src={`https://cdn.communitydragon.org/latest/champion/${champion.id}/portrait`}
                alt={champion.id}
              />
            </div>
          ))}
      </div>

      {modal && <Modal champion={modal} close={() => setModal(null)} />}
    </div>
  );
};

export default Champions;
