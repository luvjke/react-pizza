import { createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CalcTotalPrice } from '../../utils/CalcTotalPrice';

const { items, totalPrice } = getCartFromLS();

const initialState = {
  totalPrice,
  items,
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
      state.totalPrice = CalcTotalPrice(state.items);
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

export const selectCart = (state) => state.cart;
export const selectCartItem = (id) => (state) => state.cart.items.filter((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
