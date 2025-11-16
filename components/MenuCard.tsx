import { appwriteConfig } from '@/lib/appwrite'
import { MenuItem } from '@/type'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const MenuCard = ({ item: { image_url, name, price } }:{item: MenuItem}) => {

  const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`
  return (
    <TouchableOpacity>
      <Image source={{uri: imageUrl}} className="size-32 absolute -top-10" resizeMode='contain' />
    </TouchableOpacity>
  )
}

export default MenuCard