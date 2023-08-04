import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Product } from '@/api';
import { useProducts } from '@/api';
import { EmptyList, Text, View } from '@/ui';

import { Card } from './card';

export const Products = () => {
  const { data, isLoading, isError } = useProducts();
  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: Product }) => (
      <Card {...item} onPress={() => navigate('Details', { id: item.id })} />
    ),
    [navigate]
  );

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 ">
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  );
};
