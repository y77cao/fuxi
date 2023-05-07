import { OpenAIClient } from "@/clients/openai";
import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  animationAssets: { name: string; image: HTMLImageElement }[];
  openAIClient?: OpenAIClient;
  loading: boolean;
  rounds: {
    coinTossResult: number[];
    iChingResult: number;
  }[];
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
          iChingResult: 0, // TODO
        },
      ];
    },
  },
});

export const { preloaded, roundEnded } = appSlice.actions;

export default appSlice.reducer;
