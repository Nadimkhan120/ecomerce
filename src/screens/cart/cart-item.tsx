import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

import type { Cart } from '@/api';
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeProductFromCart,
} from '@/store/cart';
import { Image, Pressable, showErrorMessage, Text, View } from '@/ui';

type Props = Cart & { onPress?: () => void };

export const CartItem = ({ name, price, img, id, quantity, colour }: Props) => {
  let data = {
    name,
    price,
    img,
    id,
    quantity,
    colour,
  };

  const increaseQuantity = () => {
    increaseCartQuantity(data);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    decreaseCartQuantity(data);
  };

  const deleteCartItem = () => {
    removeProductFromCart(data);
    showErrorMessage('Cart item deleted.');
  };

  return (
    <View className="mt-2 block  flex-row  overflow-hidden rounded-xl bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900">
      <View>
        <Image
          className="h-44 w-28  rounded-xl"
          contentFit="contain"
          source={{
            uri: img,
          }}
        />
      </View>
      <View className="flex-1 px-3">
        <Text variant="md" numberOfLines={2} className="font-bold">
          {name}
        </Text>
        <Text variant="xs" className="mt-2" numberOfLines={3}>
          USD {price * quantity}
        </Text>

        <View className="flex-row items-center pt-5 ">
          <Pressable className="pr-2" onPress={decreaseQuantity}>
            <MaterialCommunityIcons name="minus-circle" size={32} />
          </Pressable>
          <Text>{quantity}</Text>
          <Pressable className="pl-2" onPress={increaseQuantity}>
            <MaterialCommunityIcons name="plus-circle" size={32} />
          </Pressable>
        </View>

        <View className="flex-row items-center pt-2">
          <Pressable className="pr-2" onPress={deleteCartItem}>
            <MaterialCommunityIcons name="trash-can" size={32} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
