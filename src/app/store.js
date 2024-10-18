import { configureStore } from '@reduxjs/toolkit';
import slideReducer from "../features/Slices/sliderSlice.jsx";
import filterReducer from '../features/Filter/filterSlice.jsx';

export const store = configureStore({
  reducer: {
    slider: slideReducer,
   filter: filterReducer,
  },
});
