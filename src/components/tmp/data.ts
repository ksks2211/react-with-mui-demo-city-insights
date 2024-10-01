import { sortBy } from "lodash-es";

export const MENU_DATA = [
  {
    title: "east-asia",
    link: "/?continent=east-asia",
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
    link: "/?continent=southeast-asia",
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
    title: "europe",
    link: "/?continent=europe",
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
    link: "/?continent=north-america",
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

function sortMenuData(data: typeof MENU_DATA) {
  const sortedData = sortBy(data, "title").map((obj) => {
    return {
      ...obj,
      items: sortBy(obj.items, "title"),
    };
  });

  return sortedData;
}

export function getMenuData() {
  return sortMenuData(MENU_DATA);
}
