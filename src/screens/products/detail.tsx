import { useRoute } from '@react-navigation/native';
import * as React from 'react';

import { useProduct } from '@/api';
import type { RouteProp } from '@/navigation/types';
import { ActivityIndicator, Image, Text, View } from '@/ui';

export const Details = () => {
  const { params } = useRoute<RouteProp<'Details'>>();
  const { data, isLoading, isError } = useProduct({
    variables: { id: params.id },
  });

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
            uri: data.img, //'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          }}
        />
      </View>
      <View className="px-6 pt-4">
        <Text variant="h3">{data.name}</Text>
        <Text variant="md" className="pt-2">
          USD {data.price}
        </Text>
      </View>
    </View>
  );
};
