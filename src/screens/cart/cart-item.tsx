import React from 'react';

import type { Cart } from '@/api';
import { Image, Pressable, Text, View } from '@/ui';

type Props = Cart & { onPress?: () => void };

export const CartItem = ({ name, price, img, onPress = () => {} }: Props) => {
  return (
    <Pressable
      className="m-2 block overflow-hidden rounded-xl  bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900"
      onPress={onPress}
    >
      <Image
        className="h-44 w-full  rounded-xl"
        contentFit="contain"
        source={{
          uri: img,
        }}
      />

      <View className="mt-3">
        <Text variant="md" numberOfLines={1} className="font-bold">
          {name}
        </Text>
        <Text variant="xs" numberOfLines={3}>
          USD {price}
        </Text>
      </View>
    </Pressable>
  );
};
