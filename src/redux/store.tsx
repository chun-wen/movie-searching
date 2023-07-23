import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '@/Redux/rootSaga';

import movieSlice from '@/Slice/movieSlice';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({
    thunk: false
  }),
  sagaMiddleware
];

const reducer = combineReducers({
  movie:movieSlice
})

const store = configureStore({
  devTools: true,
  reducer,
  middleware
})

sagaMiddleware.run(rootSaga);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch