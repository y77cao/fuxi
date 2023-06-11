export const GRAVITY = 9.8;
export const ANIMATION_SPEED = 1000;

export const COIN_ASSET_SIZE = 128;

export const hints = {
  DEFAULT: "What would you like to know about?",
  HOVER: "Hold the turtle shell to toss coins.",
  TYPING: "I am listening...",
  INPUT_LENGTH_ERROR:
    "Looks like you have many things to ask...let's start with one question.",
  ROUND_COUNT: (round: number) => ` Round ${round}/6`,
  KEEP_GOING: "Take a deep breath...stay focused on the question. Toss again.",
  LOADING: [
    "Close your eyes and take a deep breath again...",
    "Seeing through the sky, stars, and the cosmos...",
    "Listening to the wind that blows through past and future...",
    "Weaving the fabric of time and space...",
    '"From observing changes at the beginning, I have comprehended the signs of the future." — Hexagram 1, The Creative',
    '"By understanding the past, the present becomes clear." — Hexagram 2, The Receptive',
    '"Events follow the laws of the cosmos. To understand these laws and act in accordance with them means to have control over one’s own fate." — Hexagram 50, The Caldron',
    '"All beings stand side by side in incomprehensible diversity. This diversity can be made fruitful only by a decision that brings about inner peace." — Hexagram 58, The Joyous (Lake)',
  ],
};

export const MAX_INTPUT_LENGTH = 280;
