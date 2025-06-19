import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchHistory: [],
  isSearchOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addToSearchHistory: (state, action) => {
      const newItem = action.payload;
      const filtered = state.searchHistory.filter((item) => item.unique_fund_code !== newItem.unique_fund_code);

      state.searchHistory = [newItem, ...filtered].slice(0, 8);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    setIsSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { addToSearchHistory, clearSearchHistory, setIsSearchOpen } = searchSlice.actions;

export default searchSlice.reducer;
