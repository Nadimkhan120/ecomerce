import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import type { StateStorage } from 'zustand/middleware';
import { createJSONStorage, persist } from 'zustand/middleware';

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

import type { Cart } from '@/api';

import { createSelectors } from '../../core/utils';

interface CartState {
  cart: Cart[];
  addProductToCart: (data: Cart) => void;
  removeProductFromCart: (data: Cart) => void;
  increaseCartQuantity: (data: Cart) => void;
  decreaseCartQuantity: (data: Cart) => void;
}

const _useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (data: Cart) => {
        let cartItems = [...get().cart];

        let checkIfItemAlreadyExists = cartItems?.findIndex(
          (element) => element?.id === data?.id
        );
        if (checkIfItemAlreadyExists !== -1) {
        } else {
          cartItems.push(data);
        }

        set({ cart: cartItems });
      },
      removeProductFromCart: (data: Cart) => {
        let cartItems = get().cart.filter(
          (element) => element?.id !== data?.id
        );

        set({ cart: cartItems });
      },
      increaseCartQuantity: (data: Cart) => {
        let cartItems = get()?.cart?.map((element) => {
          if (element?.id === data.id) {
            return {
              ...element,
              quantity: element.quantity + 1,
            };
          }
          return element;
        });

        set({ cart: cartItems });
      },
      decreaseCartQuantity: (data: Cart) => {
        let cartItems = get()?.cart?.map((element) => {
          if (element?.id === data.id) {
            return {
              ...element,
              quantity: element.quantity - 1,
            };
          }
          return element;
        });
        set({ cart: cartItems });
      },
    }),
    {
      name: 'cart-storage', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage), // (optional) by default the 'localStorage' is used
    }
  )
);

export const useCart = createSelectors(_useCart);

export const addProductToCart = (data: Cart) => {
  return _useCart.getState().addProductToCart(data);
};

export const removeProductFromCart = (data: Cart) => {
  return _useCart.getState().removeProductFromCart(data);
};

export const increaseCartQuantity = (data: Cart) => {
  return _useCart.getState().increaseCartQuantity(data);
};

export const decreaseCartQuantity = (data: Cart) => {
  return _useCart.getState().decreaseCartQuantity(data);
};
