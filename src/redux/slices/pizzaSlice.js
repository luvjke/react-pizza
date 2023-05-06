import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://63f9e49dbeec322c57e960a3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  if (data.length === 0) {
    return thunkApi.rejectWithValue('Пиццы пустые');
  }

  return thunkApi.fulfillWithValue(data);
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
