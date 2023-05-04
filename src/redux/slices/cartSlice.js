import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });
      findItem
        ? findItem.count++
        : state.items.push({
            ...payload,
            count: 1,
          });
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem(state, { payload }) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });
      findItem && findItem.count--;
      state.totalPrice -= findItem.price;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    removeItem(state, { payload }) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });
      state.totalPrice -= findItem.price * findItem.count;
      state.items = state.items.filter((obj) => {
        return obj.id !== payload.id || obj.size !== payload.size || obj.type !== payload.type;
      });
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
