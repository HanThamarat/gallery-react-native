import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        className={`bg-secondary w-full py-4 flex justify-center items-center rounded-md my-5 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    >
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton;