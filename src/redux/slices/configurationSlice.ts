import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ConfigureRootObject, Images } from '@/Interface/I_Configuration';

const initialState: ConfigureRootObject = {
  change_keys: [],
  images: {} as Images,
};

export const configurationSlice = createSlice({
  name: 'configuration',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getConfiguration: (state) => undefined,
    setConfiguration: (state, action: PayloadAction<ConfigureRootObject>) => {
      state.change_keys = action.payload.change_keys;
      state.images = action.payload.images;
    },
  },
});

export const { getConfiguration, setConfiguration } = configurationSlice.actions;

export default configurationSlice.reducer;
