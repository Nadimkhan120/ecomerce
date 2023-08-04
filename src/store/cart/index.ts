import { create } from 'zustand';

import type { Cart } from '@/api';

import { createSelectors } from '../../core/utils';

interface CartState {
  cart: Cart[];
  addProductToCart: (data: Cart) => void;
  removeProductFromCart: (data: Cart) => void;
  increaseCartQuantity: (data: Cart) => void;
  decreaseCartQuantity: (data: Cart) => void;
}

const _useCart = create<CartState>((set, get) => ({
  cart: [],
  addProductToCart: (data: Cart) => {
    let existingCartItem = [...get().cart];

    let checkIfItemAlreadyExists = existingCartItem?.findIndex(
      (element) => element?.id === data?.id
    );
    if (checkIfItemAlreadyExists !== -1) {
    } else {
      existingCartItem.push(data);
    }

    set({ cart: existingCartItem });
  },
  removeProductFromCart: (data: Cart) => {
    let filteredCartItems = get().cart.filter(
      (element) => element?.id !== data?.id
    );

    set({ cart: filteredCartItems });
  },
  increaseCartQuantity: (data: Cart) => {
    let existingCartItem = get()?.cart?.map((element) => {
      if (element?.id === data.id) {
        return {
          ...element,
          productQuantity: element.quantity + 1,
        };
      }
      return element;
    });

    set({ cart: existingCartItem });
  },
  decreaseCartQuantity: (data: Cart) => {
    let cartItems = get()?.cart?.map((element) => {
      if (element?.id === data.id) {
        return {
          ...element,
          productQuantity: element.quantity - 1,
        };
      }
      return element;
    });
    set({ cart: cartItems });
  },
}));

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
