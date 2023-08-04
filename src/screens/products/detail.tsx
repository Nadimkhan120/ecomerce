import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';

import type { Cart } from '@/api';
import { useProduct } from '@/api';
import type { RouteProp } from '@/navigation/types';
import { addProductToCart } from '@/store/cart';
import { ActivityIndicator, Button, Image, Text, View } from '@/ui';

export const Details = () => {
  const { params } = useRoute<RouteProp<'Details'>>();

  const { goBack } = useNavigation();

  const { data, isLoading, isError } = useProduct({
    variables: { id: params.id },
  });

  const addProductToBasket = () => {
    // @ts-ignore
    let cartItem: Cart = {
      ...data,
      quantity: 1,
    };

    addProductToCart(cartItem);
    goBack();
  };

  if (isLoading) {
    return (
      <View className="flex-1  justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1  justify-center">
        <Text variant="md" className="text-center">
          Error loading post
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View>
        <Image
          className="h-44 w-full  rounded-xl"
          contentFit="contain"
          source={{
            uri: data.img,
          }}
        />
      </View>
      <View className="px-6 pt-4">
        <Text variant="h3">{data.name}</Text>
        <Text variant="md" className="pt-2">
          USD {data.price}
        </Text>
      </View>

      <View className="flex-1 justify-end px-6 pb-11 align-bottom">
        <Button
          variant="secondary"
          label="Add To Cart"
          onPress={addProductToBasket}
        />
      </View>
    </View>
  );
};
