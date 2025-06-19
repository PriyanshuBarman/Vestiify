import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeTabIndex: 0 };

const mutualFundSlice = createSlice({
  name: "mutualFund",
  initialState,
  reducers: {
    setActiveTabIndex: (state, action) => {
      state.activeTabIndex = action.payload;
    },
  },
});

export const { setActiveTabIndex } = mutualFundSlice.actions;

export const selectActiveTabIndex = (state) => state.mutualFund.activeTabIndex;

export default mutualFundSlice.reducer;
