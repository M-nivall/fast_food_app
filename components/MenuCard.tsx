import { appwriteConfig } from '@/lib/appwrite'
import { useCartStore } from '@/store/cart.store'
import { MenuItem } from '@/type'
import React from 'react'
import { Image, Platform, Text, TouchableOpacity } from 'react-native'

interface MenuCardProps {
  item: MenuItem
}

const MenuCard = ({ item: { $id, image_url, name, price } }: MenuCardProps) => {
  const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;

  const {addItem} = useCartStore();

  return (
    <TouchableOpacity
      className="menu-card pt-4" // small top padding
      style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787' } : {}}
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32" // image inside normal flow
        resizeMode="contain"
      />

      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={2}
      >
        {name}
      </Text>

      <Text className="body-regular text-gray-200 mb-4">
        From ${price}
      </Text>

      <TouchableOpacity onPress={() => addItem({id: $id, name, price, image_url: imageUrl, customizations: []})}>
        <Text className="paragraph-bold text-primary">
          Add to Cart
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard
