
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
const middleware = [thunk];

// const store = configureStore( {
//   reducer: rootReducer,
//   // middleware,
//   // devTools: process.env.NODE_ENV === "development",
// } );

// ...

export const store = configureStore( {
  reducer: {
    auth: authReducer,
  },
} )

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store