import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TextArea = ({ title, value,  placeholder, handleChangeText, otherStyles, keyboardType, ...props }) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
    <Text className="text-base text-white font-pmedium">{title}</Text>

    <View className="border-2 w-full py-2 px-4 bg-black-100 border-black-200 rounded-md focus:border-secondary items-center flex-row">
      <TextInput 
          className="flex-1 text-white font-psemibold" 
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          multiline={true}
          numberOfLines={6}
      />
    </View>
  </View>
  )
}

export default TextArea