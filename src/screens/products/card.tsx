import React from 'react';

import type { Product } from '@/api';
import { Image, Pressable, Text, View } from '@/ui';

type Props = Product & { onPress?: () => void };

export const Card = ({ name, price, img, onPress = () => {} }: Props) => {
  return (
    <Pressable
      className="m-2 block overflow-hidden rounded-xl  bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900"
      onPress={onPress}
    >
      <Image
        className="h-44 w-full  rounded-xl"
        contentFit="contain"
        source={{
          uri: img, //'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
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
