const hexagrams =
  "䷁䷗䷆䷒䷎䷣䷭䷊䷏䷲䷧䷵䷽䷶䷟䷡䷇䷂䷜䷻䷦䷾䷯䷄䷬䷐䷮䷹䷞䷰䷛䷪䷖䷚䷃䷨䷳䷕䷑䷙䷢䷔䷿䷥䷷䷝䷱䷍䷓䷩䷺䷼䷴䷤䷸䷈䷋䷘䷅䷉䷠䷌䷫䷀";

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
