import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import UserReducer from "./persistence/users/UserReducer";

const ReduxStore = configureStore({
  reducer: { UserReducer },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export default ReduxStore;
