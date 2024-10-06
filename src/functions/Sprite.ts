import { characterIds } from "../shared/character-id";
import { ArgumentMetadata } from "../shared/string-util";
import { LinscriptFunction } from "../shared/types";

export const sprite: LinscriptFunction = {
  name: "Sprite",
  parameters: [
    {
      name: "",
      unknown: true,
    },
    {
      name: "characterId",
      values: characterIds,
    },
    {
      name: "variantId",
      handler: (args: ArgumentMetadata[]) => {
        const characterIdArg = args[1].argValue;
        const variantIdArg = args[2].argValue;

        // @ts-expect-error
        return variants?.[characterIdArg]?.[variantIdArg] ?? "expression";
      },
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

const variants = {
  // Taka
  1: {
    0: "Neutral",
    1: "Worried",
    2: "Laughing",
    6: "Speaking",
    7: "Proclaim",
    8: "Proclaim Point",
    10: "Scared",
    12: "Disbelief",
    14: "Thinking",
    15: "Frustrated",
    23: "Ashamed",
  },
  // Byakuya
  2: {
    0: "Neutral",
    1: "NeutralStare",
    2: "Smug",
    3: "Angry",
    4: "Annoyed",
    6: "Sneer",
    14: "Snark",
  },
  // Mondo
  3: {
    0: "Neutral",
    2: "Annoyed",
    4: "Violent",
    5: "Yelling",
    6: "Livid",
    7: "Frustrated",
    8: "Furious",
    10: "Shocked",
    11: "Grimace",
    12: "Casual",
  },
  // Leon
  4: {
    0: "Neutral",
    1: "Neutral-2",
    2: "Relaxed",
    3: "Charming",
    6: "Worried",
    7: "Shocked",
    10: "Thinking",
    11: "Angry",
    12: "Annoyed",
    13: "Sulking",
    14: "Stupid",
  },
  // Hifumi
  5: {
    0: "Neutral",
    2: "AdjustGlasses",
    3: "Smug",
    4: "Devious",
    5: "Nervous",
    10: "Scared",
    12: "Yelling",
    16: "Pose",
    21: "Crying",
  },
  // Hiro
  6: {
    0: "Neutral",
    1: "Realization",
    2: "Laughing",
    6: "Surprised",
    11: "Thinking",
  },
  // Sayaka
  7: {
    0: "Neutral",
    1: "Shy",
    2: "Shy-2",
    3: "Intense",
    5: "Smiling",
    9: "Apologetic",
    16: "Thinking",
  },
  // Kyoko
  8: {
    0: "Neutral",
    1: "Neutral-2",
    2: "Contemplating",
    10: "Thinking",
    13: "Forceful",
    16: "Relieved",
  },
  // Hina
  9: {
    0: "Neutral",
    4: "Smiling",
    5: "Laughing", // small laugh, hand behind head
    9: "Horrified",
    14: "Shouting",
    19: "Thinking",
    20: "Positive",
    21: "Determined",
  },
  // Toko
  10: {
    0: "Neutral-Look-Away", // eyes averted
    1: "Neutral",
    2: "Lewd",
    3: "Frustrated",
    5: "Horrified",
    6: "Shocked",
    8: "Breakdown",
    9: "Shy",
    11: "Angry",
    12: "Angry Point",
  },
  // Sakura
  11: {
    0: "Neutral",
    2: "Wise",
    5: "FacingRight",
  },
  // Celeste
  12: {
    0: "Neutral",
    1: "Neutral-2", // looking aside
    2: "PoliteLaugh",
    3: "SweetSmile",
    4: "Disaapointed",
    5: "Surprised",
    7: "Thinking",
    8: "TwirlHair",
  },
  // Mukuro
  13: {
    0: "Neutral",
    2: "Disgusted",
    3: "Worried",
    5: "SmilePeace",
    6: "TwirlHair",
    8: "Talking",
    9: "Shocked",
  },
  // Chihiro
  14: {
    0: "Neutral",
    2: "Shy", // maybe embarrassed?
    3: "Smiling",
    4: "Nervous",
    5: "Upset",
    6: "Surprised",
    7: "Tearing",
    9: "Crying", // only crying a bit
    11: "SmileTearing",
  },
  // Monokuma
  15: {
    0: "Neutral",
    2: "AnnoyedClaws",
    1: "Annoyed",
    3: "Exasperated",
    4: "Laughing",
    5: "AnnoyedRaisedHands",
    7: "Sad",
    9: "Brag",
    10: "Curious",
    12: "Ominous",
    13: "Casual",
  },
};

export default sprite;
