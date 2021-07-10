import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  mode: "champions" | "players";
  language: { name: string; code: string; region: string };
  region: { acronym: string; code: string };
};

const initialState: TInitialState = {
  mode: "champions",
  language: {
    name: "English",
    code: "en_US",
    region: "United States",
  },
  region: { acronym: "EUW", code: "euw1" },
};

const rootSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<{ name: string; code: string; region: string }>
    ) => void (state.language = action.payload),
    setMode: (state, action: PayloadAction<any>) =>
      void (state.mode = action.payload),
    setRegion: (state, action: PayloadAction<any>) =>
      void (state.region = action.payload),
  },
});

export const { setLanguage, setMode, setRegion } = rootSlice.actions;

const store = configureStore({ reducer: rootSlice.reducer });

export type RootState = ReturnType<typeof store.getState>;

export default store;
