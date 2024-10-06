import { LinscriptFunction } from "../shared/types";

const backgrounds = {
  44: "Recieve School Crest", // Not sure
  113: "Welcome to Despair",
  121: "TV",
  151: "E-Handbook Nighttime Regulation",
  152: "E-Handbook Sleeping Regulation",
  153: "E-Handbook Minimal Restrictions Regulation",
  154: "E-Handbook Headmaster Violence Destruction Regulation",
  155: "E-Handbook Graduation Regulation",
  156: "E-Handbook Expansion Clause Regulation",
  184: "? Inspect ?", // Not sure
  186: "Toolkit",
  187: "Makoto's Room Key",
  189: "Chapter One: To Survive",
  206: "Ultimate Moral Compass",
  207: "Ultimate Affluent Prodigy",
  208: "Ultimate Biker Gang Leader",
  209: "Ultimate Baseball Star",
  210: "Ultimate Fanfic Writer",
  211: "Ultimate Clairvoyant",
  212: "Ultimate Popstar",
  213: "Ultimate Detective",
  214: "Ultimate Swimmer",
  215: "Ultimate Writing Prodigy",
  216: "Ultimate Martial Artist",
  217: "Ultimate Gambler",
  218: "Ultimate Fashionista",
  219: "Ultimate Programmer",
  220: "Hope's Peak Distant",
  221: "Hope's Peak Gate",
  222: "Hope's Peak Forum",
  223: "Sayaka's Band",
  224: "Leon Magazine Cover",
  225: "Fashionista Magazine Cover",
  226: "Biker Gang",
  227: "Hope's Peak Invitation Letter",
  228: "Hope's Peak Main Hall",
  229: "Makoto Classroom",
  230: "Vault",
  231: "Monokuma Close Up",
  232: "Monokuma Grabbed By Mondo",
  // 233: ? i missed this one
  234: "Gymnasium Paranioa",
  235: "E-Handbook Opening",
  237: "E-Handbook Regulation 1",
};

export const setBackground: LinscriptFunction = {
  name: "Background",
  parameters: [
    {
      name: "backgroundMode",
      values: {
        11: "Tooltip",
      },
    },
    {
      name: "backgroundId",
      unknown: true,
      values: backgrounds,
    },
    {
      name: "",
      unknown: true,
    },
    {
      name: "",
      unknown: true,
    },
    {
      name: "",
      unknown: true,
    },
    {
      name: "",
      unknown: true,
    },
    {
      name: "",
      unknown: true,
    },
    {
      name: "",
      unknown: true,
    },
  ],
};

export default setBackground;
