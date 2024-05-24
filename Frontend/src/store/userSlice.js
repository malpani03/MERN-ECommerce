import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null; // Reset the user state to null
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;