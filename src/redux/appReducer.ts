import { OpenAIClient } from "@/clients/openai";
import { coinTossResultToYao, getHexagram } from "@/utils/iching";
import { createSlice } from "@reduxjs/toolkit";
import { prompt } from "@/constants";

type AppState = {
  animationAssets: { name: string; image: HTMLImageElement }[];
  openAIClient?: OpenAIClient;
  loading: boolean;
  animating: boolean;
  rounds: {
    coinTossResult: 0 | 1[];
    iChingResult: { current: 0 | 1; future: 0 | 1 };
  }[];
  divinationResult?: string;
};

const initialState: AppState = {
  animationAssets: [],
  loading: false,
  animating: false,
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
      // bottom to top
      state.rounds = [
        {
          coinTossResult: action.payload.coinTossResult,
          iChingResult: coinTossResultToYao(action.payload.coinTossResult),
        },
        ...state.rounds,
      ];
    },
    animationStarted: (state) => {
      state.animating = true;
    },
    animationEnded: (state) => {
      state.animating = false;
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

export const {
  preloaded,
  roundEnded,
  animationStarted,
  animationEnded,
  divinationRequest,
  divinationSuccess,
} = appSlice.actions;

export const askQuestion =
  (question: string, locale: string) =>
  async (dispatch: any, getState: () => any) => {
    dispatch(divinationRequest());
    try {
      const state = getState();
      const { rounds, openAIClient } = state.app as AppState;

      const currentResult = rounds.map((r) => r.iChingResult.current);
      const futureResult = rounds.map((r) => r.iChingResult.future);

      const currentHexagram = getHexagram(currentResult);
      const futureHexagram = getHexagram(futureResult);

      let completion = await openAIClient?.chatCompletion(
        prompt[locale](question, currentHexagram, futureHexagram)
      );
      console.log({ completion });

      dispatch(divinationSuccess({ divinationResult: completion }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export default appSlice.reducer;
