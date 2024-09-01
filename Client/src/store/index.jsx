import { configureStore } from "@reduxjs/toolkit";
import userReducer, { logoutOrSignout } from "./slices/userSlice"; // Import your userSlice
import favouritesReducer from "./slices/favouriteSlice";
import {
  favouriteFailure,
  favouriteStart,
  favouriteSuccess,
  favouriteDelete,
  favouriteAdd,
} from "./slices/favouriteSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Add your userSlice reducer to the store
    // Add other reducers if needed
    favourites: favouritesReducer,
  },
});

export {
  store,
  logoutOrSignout,
  favouriteFailure,
  favouriteSuccess,
  favouriteStart,
  favouriteAdd,
  favouriteDelete,
};
