import { OpenAIClient } from "@/clients/openai";
import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  animationAssets: { name: string; image: HTMLImageElement }[];
  openAIClient?: OpenAIClient;
  loading: boolean;
};

const initialState: AppState = {
  animationAssets: [],
  loading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    preloaded: (state, action) => {
      state.animationAssets = action.payload.animationAssets;
      state.openAIClient = action.payload.openAIClient;
    },
  },
});

export const { preloaded } = appSlice.actions;

export default appSlice.reducer;
