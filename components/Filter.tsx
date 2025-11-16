import { Category } from '@/type';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Filter = ({categories}: {categories: Category[]}) => {

    const searchParams = useLocalSearchParams();
    const[active, setActive] = useState(searchParams.category || '');
    const handlePress = (id: string) => {};

    const filterData: (Category | {$id: string; name: string})[] = categories
        ? [{$id: 'all', name: 'All'}, ...categories]
        : [{$id: 'all', name: 'All'}]
  return (
    <View>
      <Text>Filter</Text>
    </View>
  )
}

export default Filter