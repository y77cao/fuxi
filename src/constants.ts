export const GRAVITY = 9.8;
export const ANIMATION_SPEED = 1000;

export const COIN_ASSET_SIZE_LARGE = 128;
export const COIN_ASSET_SIZE_SMALL = 64;

export const ASSET_RESIZE_HEIGHT = 720;

export const loadingText: Record<string, string[]> = {
  en: [
    "Close your eyes and take a deep breath again...",
    "Seeing through the sky, stars, and the cosmos...",
    "Listening to the wind that blows through past and future...",
    "Weaving the fabric of time and space...",
    '"From observing changes at the beginning, I have comprehended the signs of the future." — Hexagram 1, The Creative',
    '"By understanding the past, the present becomes clear." — Hexagram 2, The Receptive',
    '"Events follow the laws of the cosmos. To understand these laws and act in accordance with them means to have control over one’s own fate." — Hexagram 50, The Caldron',
    '"All beings stand side by side in incomprehensible diversity. This diversity can be made fruitful only by a decision that brings about inner peace." — Hexagram 58, The Joyous (Lake)',
  ],
  ch: [
    "请静候。",
    "“易者，象也；卦者，情也。” -- 《周易·系辞上》",
    "“卜者，咸也；占者，断也。” -- 《周易·系辞下》",
    "沉思熟虑，鉴瑕索隐。",
    "深吸积气。安然无忧。",
    "聚精会神，持专则易。",
  ],
};

export const prompt: Record<
  string,
  (
    question: string,
    currentHexagram: string,
    futureHexagram: string,
    currentHexagramName: string,
    futureHexagramName: string
  ) => string
> = {
  en: (
    question: string,
    currentHexagram: string,
    futureHexagram: string,
    currentHexagramName: string,
    futureHexagramName: string
  ) =>
    `You are an I Ching divination master. Given the question ${question}, ` +
    `Explain the divination result with current hexagram ${currentHexagram}, ` +
    `and future hexagram ${futureHexagram}. The response should be in two paragrahs. ` +
    `First paragrah explains the meaning of the given hexagrams, using quotes from I Ching itself. ` +
    `The second paragrah answers the question. Return the result only and nothing else. If the question does not make sense, ` +
    `consider it empty.`,
  ch: (
    question: string,
    currentHexagram: string,
    futureHexagram: string,
    currentHexagramName: string,
    futureHexagramName: string
  ) =>
    `你是易经卜卦大师。根据客户的问题：${question}，` +
    `解释卜卦结果的主卦：${currentHexagramName}卦（${currentHexagram}），和变卦：${futureHexagramName}卦（${futureHexagram}）。回答应该分为两个段落。` +
    `第一段用易经本身的引用解释两个卦象的含义。` +
    `第二段回答客户的问题。只返回两个段落，不要注释。如果问题不合理，认为它是空的。`,
};

export const MAX_INPUT_LENGTH = 140;
