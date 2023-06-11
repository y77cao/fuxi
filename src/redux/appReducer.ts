import { OpenAIClient } from "@/clients/openai";
import { coinTossResultToYao, getHexagram } from "@/utils/iching";
import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  animationAssets: { name: string; image: HTMLImageElement }[];
  openAIClient?: OpenAIClient;
  loading: boolean;
  rounds: {
    coinTossResult: 0 | 1[];
    iChingResult: { current: 0 | 1; future: 0 | 1 };
  }[];
  divinationResult?: string;
};

const initialState: AppState = {
  animationAssets: [],
  loading: false,
  rounds: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    preloaded: (state, action) => {
      state.animationAssets = action.payload.animationAssets;
      state.openAIClient = action.payload.openAIClient;
    },
    roundEnded: (state, action) => {
      state.rounds = [
        ...state.rounds,
        {
          coinTossResult: action.payload.coinTossResult,
          iChingResult: coinTossResultToYao(action.payload.coinTossResult),
        },
      ];
    },
    divinationRequest: (state) => {
      state.loading = true;
    },
    divinationSuccess: (state, action) => {
      state.loading = false;
      state.divinationResult = action.payload.divinationResult;
    },
  },
});

export const { preloaded, roundEnded, divinationRequest, divinationSuccess } =
  appSlice.actions;

export const askQuestion =
  (question: string) => async (dispatch: any, getState: () => any) => {
    dispatch(divinationRequest());
    try {
      const state = getState();
      const { rounds, openAIClient } = state.app as AppState;

      const currentResult = rounds.map((r) => r.iChingResult.current);
      const futureResult = rounds.map((r) => r.iChingResult.future);

      const currentHexagram = getHexagram(currentResult);
      const futureHexagram = getHexagram(futureResult);

      const prompt =
        `You are an I Ching divination master. Given the question ${question}, ` +
        `Explain the divination result with current hexagram ${currentHexagram}, ` +
        `and future hexagram ${futureHexagram}. The response should be in two sections. ` +
        `First section explains the meaning of the given hexagrams, using quotes from I Ching itself. ` +
        `The second section answers the question, using voice of a buddha.`;

      let completion =
        'Section 1: Explanation of the Hexagrams\n\nThe current hexagram, ䷗, is known as Huan, meaning "dispersion" or "dissolution." According to the I Ching, "Dispersion. Success. The king approaches his temple. It furthers one to cross the great water. Perseverance furthers." This hexagram represents a time when obstacles are being dissolved, and the situation is ripe for progress and success.\n\nThe future hexagram, ䷵, is called Shi He, meaning "biting through" or "breaking through limitations." The I Ching states, "Biting through has success. It is favorable to let justice be administered." This hexagram indicates that by asserting oneself and taking decisive action, you can break through any barriers and achieve your goals.\n\nSection 2: Answering the Question\n\nOh noble seeker of wisdom, the hexagrams reveal that you are currently in a phase of dispersion, where barriers and obstacles are dissolving away. This is a time for progress and success. It is essential to maintain an open mind and embrace change during this period, as it will lead to growth and transformation.\n\nAs you move forward, you will encounter a time of biting through, where you must assert yourself and take decisive action to overcome any remaining limitations. Do not shy away from challenges; instead, face them with courage and determination. By doing so, you will break through any barriers and achieve your desired outcome.\n\nRemember, dear one, that perseverance furthers your journey towards enlightenment and inner peace. Remain steadfast in your convictions and trust in the guidance of the I Ching. By following this path, you will reach greater heights and experience the harmony you seek.'; // await openAIClient?.chatCompletion(prompt);
      console.log({ completion });

      dispatch(divinationSuccess({ divinationResult: completion }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export default appSlice.reducer;
