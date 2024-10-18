import { createSlice } from "@reduxjs/toolkit";
import { casualData } from "../../assets/data/dummyData";

const initialState = {
  products: casualData,
  filteredProducts: casualData,
  filters: {
    categories: [],
    colors: [],
    sizes: [],
    dressStyle: [],
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.categories = action.payload;
      state.filteredProducts = applyFilters(state.filters, state.products);
    },
    setColorFilter: (state, action) => {
      state.filters.colors = action.payload;
      state.filteredProducts = applyFilters(state.filters, state.products);
    },
    setSizeFilter: (state, action) => {
      state.filters.sizes = action.payload;
      state.filteredProducts = applyFilters(state.filters, state.products);
    },
    setDressStyleFilter: (state, action) => {
      state.filters.dressStyle = action.payload;
      state.filteredProducts = applyFilters(state.filters, state.products);
    },
  },
});

const applyFilters = (filters, products) => {
  return products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    const matchesColor =
      filters.colors.length === 0 ||
      product.color.some((color) => filters.colors.includes(color));

    const matchesSize =
      filters.sizes.length === 0 ||
      product.size.some((size) => filters.sizes.includes(size));

    const matchesDressStyle =
      filters.dressStyle.length === 0 ||
      filters.dressStyle.includes(product.style);

    return matchesCategory && matchesColor && matchesSize && matchesDressStyle;
  });
};

export const {
  setCategoryFilter,
  setColorFilter,
  setSizeFilter,
  setDressStyleFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
