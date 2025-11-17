import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string}>();
  const [query, setQuery] = useState(params.query);

  const handleSearch = (tex: string) => {}
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor="#A0A0A0"
       />
    </View>
  )
}

export default SearchBar