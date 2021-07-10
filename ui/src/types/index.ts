export type TLanguage = {};

export type TChampionDescription = {
  blurb: string;
  id: string;
  image: {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
  };
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  key: string;
  name: string;
  partype: string;
  stats: {
    armor: number;
    armorperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackrange: number;
    attackspeed: number;
    attackspeedperlevel: number;
    crit: number;
    critperlevel: number;
    hp: number;
    hpperlevel: number;
    hpregen: number;
    hpregenperlevel: number;
    movespeed: number;
    mp: number;
    mpperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    tags: Array<string>;
    title: string;
    version: string;
  };
};

export type TChampionDetails = {
  allytips: Array<string>;
  blurb: string;
  enemytips: Array<string>;
  id: string;
  image: {
    full: string;
    group: string;
    h: number;
    sprite: string;
    w: number;
    x: number;
    y: number;
  };
  info: {
    attack: 8;
    defense: 4;
    difficulty: 4;
  };
  key: number;
  lore: string;
  name: string;
  partype: string;
  passive: {
    description: string;
    image: {
      full: string;
      group: string;
      h: number;
      sprite: string;
      w: number;
      x: number;
      y: number;
    };
    name: string;
  };
  recommended: Array<{
    blocks: Array<{
      appendAfterSection: string;
      hiddenWithAnyOf: Array<string>;
      hideIfSummonerSpell: string;
      items: Array<{
        count: number;
        hideCount: boolean;
        id: string;
      }>;
      maxSummonerLevel: number;
      minSummonerLevel: number;
      recMatch: boolean;
      recSteps: boolean;
      showIfSummonerSpell: string;
      type: string;
      visibleWithAllOf: Array<string>;
    }>;
    champion: string;
    customPanel: string | null;
    customTag: string;
    extensionPage: boolean;
    map: string;
    mode: string;
    sortrank: number;
    title: string;
    type: string;
    useObviousCheckmark: boolean;
  }>;
  skins: Array<{
    chromas: boolean;
    id: string;
    name: string;
    num: number;
  }>;
  spells: Array<{
    cooldown: Array<number>;
    cooldownBurn: string;
    cost: Array<number>;
  }>;
};
