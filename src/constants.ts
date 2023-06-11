export const GRAVITY = 9.8;
export const ANIMATION_SPEED = 1000;

export const COIN_ASSET_SIZE = 128;

export const hints = {
  DEFAULT: "What would you like to know about?",
  HOVER: "Hold the turtle shell to toss coins.",
  TYPING: "I am listening...",
  INPUT_LENGTH_ERROR:
    "Looks like you have many things to ask...let's start with one question.",
  ROUND_END: (round: number) => ` Round ${round}/6`,
  KEEP_GOING: "Take a deep breath...stay focused on the question. Toss again.",
};

export const MAX_INTPUT_LENGTH = 280;
