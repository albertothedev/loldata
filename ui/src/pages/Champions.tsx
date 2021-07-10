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
  const [filteredChampions, setFilteredChampions] = useState<Array<TChampionDescription> | null>(null);
  const [modal, setModal] = useState<TChampionDetails | null>(null);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_LOLDATA_API_URL}/champions`, {
        code: language.code,
      })
      .then((res: AxiosResponse) => {
        setChampions(Object.values(res.data));
        setFilteredChampions(Object.values(res.data));
      });
  }, [language]);

  const searchChampion = (value: string): void => {
    let temporary = Object.values(champions).filter((champion: any) => champion.name.toLowerCase().startsWith(value.toLowerCase()));
    setFilteredChampions(temporary);
  };

  const openModal = (championId: string): void => {
    axios
      .post(`${process.env.REACT_APP_LOLDATA_API_URL}/champion`, {
        code: language.code,
        championId,
      })
      .then((res: AxiosResponse) => setModal(res.data))
      .catch((error: AxiosError) => console.error(error));
  };

  return (
    <div className="championsContainer">
      <ChampionsNavBar searchChampion={(value: any) => searchChampion(value)} />

      <div className="champions">
        {filteredChampions &&
          filteredChampions.map((champion: any, index: any) => (
            <div className="champions__champion" onClick={() => openModal(champion.id)} key={index}>
              <div className="champions__champion__filter">
                <span
                  className="champions__champion__filter__name"
                  style={{
                    backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg)`,
                    backgroundPosition: "center",
                  }}
                >
                  {champion.name.toUpperCase()}
                </span>
              </div>
              <img
                className="champions__champion__image"
                src={`
        http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg
      `}
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
