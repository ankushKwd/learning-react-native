import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    ids: [],
  },
  reducers: {
    addFavourites: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavourries: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const addFavourite = favouritesSlice.actions.addFavourites;
export const removeFavourite = favouritesSlice.actions.removeFavourries;

export default favouritesSlice.reducer;
