const hexagrams =
  "䷁䷗䷆䷒䷎䷣䷭䷊䷏䷲䷧䷵䷽䷶䷟䷡䷇䷂䷜䷻䷦䷾䷯䷄䷬䷐䷮䷹䷞䷰䷛䷪䷖䷚䷃䷨䷳䷕䷑䷙䷢䷔䷿䷥䷷䷝䷱䷍䷓䷩䷺䷼䷴䷤䷸䷈䷋䷘䷅䷉䷠䷌䷫䷀";

const hexagramToNamesEN: Record<string, string> = {
  "䷀": "The Creative",
  "䷁": "The Receptive",
  "䷂": "Difficulty at the Beginning",
  "䷃": "Youthful Folly",
  "䷄": "Waiting",
  "䷅": "Conflict",
  "䷆": "The Army",
  "䷇": "Holding Together",
  "䷈": "Small Taming",
  "䷉": "Treading",
  "䷊": "Peace",
  "䷋": "Standstill",
  "䷌": "Fellowship",
  "䷍": "Possession in Great Measure",
  "䷎": "Modesty",
  "䷏": "Enthusiasm",
  "䷐": "Following",
  "䷑": "Work on what has been spoiled",
  "䷒": "Approach",
  "䷓": "Contemplation",
  "䷔": "Biting Through",
  "䷕": "Grace",
  "䷖": "Splitting Apart",
  "䷗": "Return",
  "䷘": "Innocence",
  "䷙": "Taming Power of the Great",
  "䷚": "The Corners of the Mouth",
  "䷛": "Preponderance of the Great",
  "䷜": "The Abysmal",
  "䷝": "The Clinging",
  "䷞": "Influence",
  "䷟": "Duration",
  "䷠": "Retreat",
  "䷡": "Great Power",
  "䷢": "Progress",
  "䷣": "Darkening of the Light",
  "䷤": "The Family",
  "䷥": "Opposition",
  "䷦": "Obstruction",
  "䷧": "Deliverance",
  "䷨": "Decrease",
  "䷩": "Increase",
  "䷪": "Breakthrough",
  "䷫": "Coming to Meet",
  "䷬": "Gathering Together",
  "䷭": "Pushing Upward",
  "䷮": "Oppression",
  "䷯": "The Well",
  "䷰": "Revolution",
  "䷱": "The Cauldron",
  "䷲": "The Arousing",
  "䷳": "Keeping Still",
  "䷴": "Development",
  "䷵": "The Marrying Maiden",
  "䷶": "Abundance",
  "䷷": "The Wanderer",
  "䷸": "The Gentle",
  "䷹": "The Joyous",
  "䷺": "Dispersion",
  "䷻": "Limitation",
  "䷼": "Inner Truth",
  "䷽": "Small Preponderance",
  "䷾": "After Completion",
  "䷿": "Before Completion",
};

const hexagramToNamesCH: Record<string, string> = {
  "䷀": "乾",
  "䷁": "坤",
  "䷂": "屯",
  "䷃": "蒙",
  "䷄": "需",
  "䷅": "讼",
  "䷆": "师",
  "䷇": "比",
  "䷈": "小畜",
  "䷉": "履",
  "䷊": "泰",
  "䷋": "否",
  "䷌": "同人",
  "䷍": "大有",
  "䷎": "谦",
  "䷏": "豫",
  "䷐": "随",
  "䷑": "蛊",
  "䷒": "临",
  "䷓": "观",
  "䷔": "噬嗑",
  "䷕": "贲",
  "䷖": "剥",
  "䷗": "复",
  "䷘": "无妄",
  "䷙": "大畜",
  "䷚": "颐",
  "䷛": "大过",
  "䷜": "坎",
  "䷝": "离",
  "䷞": "咸",
  "䷟": "恒",
  "䷠": "遯",
  "䷡": "大壮",
  "䷢": "晋",
  "䷣": "明夷",
  "䷤": "家人",
  "䷥": "睽",
  "䷦": "蹇",
  "䷧": "解",
  "䷨": "损",
  "䷩": "益",
  "䷪": "夬",
  "䷫": "姤",
  "䷬": "萃",
  "䷭": "升",
  "䷮": "困",
  "䷯": "井",
  "䷰": "革",
  "䷱": "鼎",
  "䷲": "震",
  "䷳": "艮",
  "䷴": "渐",
  "䷵": "归妹",
  "䷶": "丰",
  "䷷": "旅",
  "䷸": "巽",
  "䷹": "兑",
  "䷺": "涣",
  "䷻": "节",
  "䷼": "中孚",
  "䷽": "小过",
  "䷾": "既济",
  "䷿": "未济",
};

const hexagramToNames: Record<string, Record<string, string>> = {
  en: hexagramToNamesEN,
  ch: hexagramToNamesCH,
};

/**
 * 1．三枚铜钱中有两枚正面向上，这是少阳之象，记做“ ━ ”，为阳爻
 * 2．三枚铜钱中只有一枚正面向上，这是少阴之象，记做“ – –  ”，为阴爻
 * 3．三枚铜钱都是正面向上，这是老阴之象，记做“ × ”，为变爻，在主卦中是阴爻，在变卦中是阳爻
 * 4．三枚铜钱都是反面向上，这是老阳之象，记做“ ○ ”，为变爻，在主卦中是阳爻，在变卦中是阴爻
 */
export const coinTossResultToYao = (
  coinTossResult: number[]
): { current: 0 | 1; future: 0 | 1 } => {
  const sum = coinTossResult.reduce((a, b) => a + b, 0);

  // 3 heads, 0 tails -> current ying, future yang
  if (sum === 0) {
    return { current: 0, future: 1 };

    // 2 heads, 1 tail -> yang all the way
  } else if (sum === 1) {
    return { current: 1, future: 1 };

    // 1 head, 2 tails -> ying all the way
  } else if (sum === 2) {
    return { current: 0, future: 0 };

    // 0 heads, 3 tails -> current yang, future ying
  } else if (sum === 3) {
    return { current: 1, future: 0 };
  } else {
    throw new Error("Invalid coin toss result");
  }
};

export const getHexagram = (result: (0 | 1)[]) => {
  if (result.length !== 6) {
    throw new Error("Input array must have a size of 6");
  }

  // Convert the coin toss array to binary and then to decimal
  const binaryString = result.join("");
  const decimalIndex = parseInt(binaryString, 2);

  // Get the corresponding hexagram from the string
  return hexagrams[decimalIndex];
};

export const getHexagramName = (result: (0 | 1)[], locale: string) => {
  if (result.length !== 6) {
    throw new Error("Input array must have a size of 6");
  }

  // Convert the coin toss array to binary and then to decimal
  const binaryString = result.join("");
  const decimalIndex = parseInt(binaryString, 2);
  const hexagram = hexagrams[decimalIndex];
  // Get the corresponding hexagram from the string
  return hexagramToNames[locale][hexagram];
};
