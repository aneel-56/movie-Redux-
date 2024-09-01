import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    loading: false,
    error: true,
  },
  reducers: {
    favouriteStart: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    favouriteSuccess: (state, action) => {
      state.loading = false;
      state.favourites = action.payload;
      state.error = false;
    },
    favouriteFailure: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    favouriteAdd: (state, action) => {
      console.log("state", state.favourites);
      state.favourites = action.payload;
    },
    favouriteDelete: (state, action) => {
      state.favourites = state.favourites.filter((each) => {
        console.log("each", each);
        each.id != action.payload;
      });
    },
  },
});

export const {
  favouriteFailure,
  favouriteStart,
  favouriteSuccess,
  favouriteAdd,
  favouriteDelete,
} = favouriteSlice.actions;
export default favouriteSlice.reducer;
