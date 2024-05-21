import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value,  placeholder, handleChangeText, otherStyles, keyboardType, ...props }) => {

  const [Showpassword, setShowpassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white font-pmedium">{title}</Text>

      <View className="border-2 w-full h-14 px-4 bg-black-100 border-black-200 rounded-md focus:border-secondary items-center flex-row">
        <TextInput 
            className="flex-1 text-white font-psemibold" 
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
            secureTextEntry={ title === 'Password' && !Showpassword }
        />

        { title === 'Password' && (
            <TouchableOpacity onPress={() => {
                setShowpassword(!Showpassword);
            }}>
                <Image source={ !Showpassword ? icons.eye : icons.eyeHide } className="w-6 h-6" resizeMode='contain' />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField