import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Cart } from '@/api';
import { useCart } from '@/store/cart';
import { EmptyList, View } from '@/ui';

import { CartItem } from './cart-item';

export const Basket = () => {
  const { navigate } = useNavigation();

  const cart = useCart((state) => state.cart);

  const renderItem = React.useCallback(
    ({ item }: { item: Cart }) => (
      <CartItem
        {...item}
        onPress={() => navigate('Details', { id: item.id })}
      />
    ),
    [navigate]
  );

  return (
    <View className="flex-1 ">
      <FlashList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList />}
        estimatedItemSize={300}
      />
    </View>
  );
};
