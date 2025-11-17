import React from 'react'
import { TextInput, View } from 'react-native'

const SearchBar = () => {
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
       />
    </View>
  )
}

export default SearchBar