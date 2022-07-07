import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import health from "../assets/stats/health.png";
import attackdamage from "../assets/stats/attackdamage.png";
import attackspeed from "../assets/stats/attackspeed.png";
import attackrange from "../assets/stats/attackrange.png";
import movementspeed from "../assets/stats/movementspeed.png";
import armor from "../assets/stats/armor.png";
import magicresistance from "../assets/stats/magicresistance.png";

type ModalProps = {
  champion: any;
  close: any;
};

const Modal = ({ champion, close }: ModalProps): JSX.Element => {
  const [skinIndex, setSkinIndex] = useState<any>(0);

  const regExHTML: RegExp = /(<([^>]+)>)/gi;
  const skillOrder: Array<string> = ["P", "Q", "W", "E", "R"];

  const previous = () => (skinIndex === 0 ? setSkinIndex(champion.skins.length - 1) : setSkinIndex(skinIndex - 1));

  const next = () => (skinIndex === champion.skins.length - 1 ? setSkinIndex(0) : setSkinIndex(skinIndex + 1));

  return (
    <div className="modalContainer" onClick={() => close()}>
      <div className="modal" onClick={(e: any) => e.stopPropagation()}>
        <div className="modal__spotlight">
          <div className="modal__spotlight__header">
            <h1 className="modal__spotlight__header__name">{champion.name}</h1>
            <h2 className="modal__spotlight__header__title">{champion.title}</h2>
          </div>

          <div className="modal__spotlight__splashArt">
            <div className="modal__spotlight__splashArt__filter">
              <FontAwesomeIcon icon={faAngleLeft} className="modal__spotlight__splashArt__filter__icon" id="arrowLeft" onClick={() => previous()} />
              <FontAwesomeIcon icon={faAngleRight} className="modal__spotlight__splashArt__filter__icon" id="arrowRight" onClick={() => next()} />
              <span className="modal__spotlight__splashArt__filter__skin">{champion.skins[skinIndex].name}</span>
            </div>
            <img
              className="modal__spotlight__splashArt__image"
              // src={`
              //   http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${champion.skins[skinIndex].num}.jpg
              // `}
              src={`
              https://cdn.communitydragon.org/latest/champion/${champion.id}/splash-art/skin/${skinIndex}
            `}
            />
          </div>

          <p className="modal__spotlight__lore">{champion.shortBio}</p>
        </div>

        <div className="modal__info">
          {/* {champion.abilities.map((spell: any, index: any) => (
            <div className="modal__info__ability" key={index}>
              <img
                className="modal__info__ability__image"
                src={`
                http://ddragon.leagueoflegends.com/cdn/12.4.1/img/${spell.image.group}/${spell.image.full}
              `}
                alt=""
              />

              <div className="modal__info__ability__header">
                <h4 className="modal__info__ability__header__title">
                  [{skillOrder[index]}] {spell.name}
                </h4>
                {spell.cooldown ? (
                  <span className="modal__info__ability__header__cooldown">{spell.cooldown.toString().replaceAll(",", " / ")}</span>
                ) : null}
              </div>

              <p className="modal__info__ability__description">{spell.description.replace(regExHTML, "")}</p>
            </div>
          ))} */}
          {[{ ...champion.passive, spellkey: "p" }, ...champion.spells].map((spell: any, index: any) => (
            <div className="modal__info__ability" key={index}>
              <img
                className="modal__info__ability__image"
                //   src={`
                //   http://ddragon.leagueoflegends.com/cdn/12.4.1/img/${spell.image.group}/${spell.image.full}
                // `}
                src={`https://cdn.communitydragon.org/:patch/champion/:championKey/ability-icon/${spell.spellKey}`}
                alt=""
              />

              <div className="modal__info__ability__header">
                <h4 className="modal__info__ability__header__title">
                  [{skillOrder[index]}] {spell.name}
                </h4>
                {spell.cooldown ? (
                  // <span className="modal__info__ability__header__cooldown">{spell.cooldown.toString().replaceAll(",", " / ")}</span>
                  <span className="modal__info__ability__header__cooldown">{spell.cooldownCoefficients.join(" / ")}</span>
                ) : null}
              </div>

              <p className="modal__info__ability__description">{spell.description.replace(regExHTML, "")}</p>
            </div>
          ))}

          {/* <div className="modal__info__stats">
            <img className="modal__info__stats__icon" src={health} />
            <span className="modal__info__stats__value">{champion.stats.hp}</span>

            <img className="modal__info__stats__icon" src={attackdamage} />
            <span className="modal__info__stats__value">{champion.stats.attackdamage}</span>

            <img className="modal__info__stats__icon" src={attackspeed} />
            <span className="modal__info__stats__value">{champion.stats.attackspeed} </span>

            <img className="modal__info__stats__icon" src={attackrange} />
            <span className="modal__info__stats__value">{champion.stats.attackrange}</span>

            <img className="modal__info__stats__icon" src={movementspeed} />
            <span className="modal__info__stats__value">{champion.stats.movespeed}</span>

            <img className="modal__info__stats__icon" src={armor} />
            <span className="modal__info__stats__value">{champion.stats.armor}</span>

            <img className="modal__info__stats__icon" src={magicresistance} />
            <span className="modal__info__stats__value">{champion.stats.spellblock}</span>
          </div> */}
        </div>

        <button className="modal__close" onClick={close}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default Modal;
