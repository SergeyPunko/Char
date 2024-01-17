import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
