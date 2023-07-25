import { combineReducers, configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootSaga from '@/Redux/rootSaga';

import configurationSlice from '@/Slice/configurationSlice';
import movieSlice from '@/Slice/movieSlice';
import userSlice from '@/Slice/userSlice';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  thunk,
  sagaMiddleware
];

const reducer = combineReducers({
  movie:movieSlice,
  configuration: configurationSlice,
  user:userSlice
})

const store = configureStore({
  reducer,
  middleware
})

sagaMiddleware.run(rootSaga);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch