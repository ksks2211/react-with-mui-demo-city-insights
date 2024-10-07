import { sortBy } from "lodash-es";

const CITIES = [
  "new-york",
  "london",
  "seoul",
  "paris",
  "toronto",
  "singapore",
  "hong-kong",
  "tokyo",
  "los-angeles",
  "sao-paulo",
];

export { CITIES };

const MENU_DATA = [
  {
    title: "east-asia",
    link: "?continent=east-asia",
    items: [
      {
        title: "seoul",
        link: "/seoul",
        continent: "east-asia",
        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/seoul.jfif",
      },
      {
        title: "tokyo",
        link: "/tokyo",
        continent: "east-asia",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/tokyo.jfif",
      },
      {
        title: "hong-kong",
        link: "/hong-kong",
        continent: "east-asia",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/hong-kong.jfif",
      },
    ],
  },
  {
    title: "southeast-asia",
    link: "?continent=southeast-asia",
    items: [
      {
        title: "singapore",
        link: "/singapore",
        continent: "southeast-asia",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/singapore.jfif",
      },
    ],
  },
  {
    title: "south-america",
    link: "?continent=south-america",
    items: [
      {
        title: "sao-paulo",
        link: "/sao-paulo",
        continent: "south-america",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/sao-paulo.jpg",
      },
    ],
  },
  {
    title: "europe",
    link: "?continent=europe",
    items: [
      {
        title: "london",
        link: "/london",
        continent: "europe",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/london.jfif",
      },
      {
        title: "paris",
        link: "/paris",
        continent: "europe",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/paris.jfif",
      },
    ],
  },

  {
    title: "north-america",
    link: "?continent=north-america",
    items: [
      {
        title: "toronto",
        link: "/toronto",
        continent: "north-america",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/toronto.jfif",
      },
      {
        title: "new-york",
        link: "/new-york",
        continent: "north-america",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/new-york.jfif",
      },
      {
        title: "los-angeles",
        link: "/los-angeles",
        continent: "north-america",

        img: "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/images/los-angeles.jfif",
      },
    ],
  },
];

export type Continents = typeof MENU_DATA;

function sortMenuData(data: Continents) {
  const sortedData = sortBy(data, "title").map((obj) => {
    return {
      ...obj,
      items: sortBy(obj.items, "title"),
    };
  });

  return sortedData;
}
function createMenuData() {
  let menu: Continents | undefined = undefined;

  return function getMenuData() {
    if (!menu) {
      menu = sortMenuData(MENU_DATA);
    }
    return menu;
  };
}

export const getMenuData = createMenuData();
export type Continent = Continents[number];
