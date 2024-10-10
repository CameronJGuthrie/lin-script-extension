import { characterIds } from "../shared/character-id";
import { ArgumentMetadata } from "../shared/string-util";
import { LinscriptFunction } from "../shared/types";

const sounds = {
  // Taka
  1: {
    3: "Ughn!",
    8: "Listen to me!",
    9: "Quiet down and listen!",
    10: "What the heck!",
    12: "You understand?",
    13: "Got it!",
  },
  // Byakuya
  2: {
    3: "Hm.",
    28: "Hm!",
  },
  // Mondo
  3: {
    2: "Yo.",
    4: "Whaaat. What?",
    5: "Hey, come on",
    8: "What? (angry)",
    14: "Tch. Shit.",
    38: "Huhh. This sucks.",
  },
  // Leon
  4: {
    7: "Seems like...",
    22: "Hey ya bastard",
    23: "Hey, come on",
    40: "Hmm",
  },
  // Hifumi
  5: {
    24: "Eh!",
    40: "(Heavy breathing)",
  },
  // Hiro
  6: {
    2: "Yo!",
    3: "You know?",
    6: "Huhhahahaha",
    8: "Hey, come on",
    42: "Actually",
  },
  // Sayaka
  7: {
    2: "Hey, um",
    3: "Umm...",
    8: "Like I said, I'm Psychic",
    9: "You see...",
    12: "Hehehe",
    13: "That's good",
    20: "Uhmm...",
    26: "Ehehe",
    36: "Okay",
  },
  // Kyoko
  8: {
    2: "However",
    14: "Well",
    36: "It's true",
    42: "It would seem...",
  },
  // Hina
  9: {
    3: "But...",
    4: "Hmmm...",
    13: "But...",
    14: "Umm...",
    15: "But...",
    20: "Oo-h!",
    22: "Agh.",
    25: "Sorry...",
    26: "Aww...",
  },
  // Toko
  10: {
    3: "Er, eheh",
    4: "W-what's your problem?",
    5: "Hehehehehe",
    13: "Eughhh...",
    16: "Ugnh eugnnh!",
  },
  // Sakura
  11: {
    2: "So then...",
    15: "Hmm...",
    36: "However",
    38: "So in the end...",
  },
  // Celeste
  12: {
    2: "Hehehm",
    3: "Actually",
    4: "Are you okay with this?",
    9: "Most unfortuntate",
    14: "Lets see...",
    15: "Yes, indeed.",
    28: "Do you understand?",
  },
  // Mukuro
  13: {
    4: "But, more important:",
    5: "And plus...",
    8: "What can we do?",
    9: "This is bad",
    11: "Bad bad bad bad bad!",
    12: "Stop it!",
    17: "Hmm",
    13: "The hell's wrong with you?",
    19: "What the?",
    23: "Wuh?",
    31: "Are you for real?",
  },
  // Chihiro
  14: {
    2: "Uhh...",
    7: "Umm...",
    8: "Uh?",
    9: "What should I do?",
    25: "That's...",
  },
};

export const voice: LinscriptFunction = {
  name: "Voice",
  parameters: [
    {
      name: "characterId",
      values: characterIds,
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
      name: "soundId",
      handler: (args: ArgumentMetadata[]) => {
        const characterIdArg = args[0].argValue;
        const soundIdArg = args[3].argValue;

        // @ts-expect-error
        return sounds?.[characterIdArg]?.[soundIdArg] ?? "sound";
      },
    },
    {
      name: "volume",
    },
  ],
};

export default voice;
