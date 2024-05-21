import { Text, View, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { images } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasterLayout from '../../components/layouts/master';
import CustomButton from '../../components/CustomButton';

const ProfileScreen = () => {

  const handleSignout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      const checklogout = await AsyncStorage.getItem('userData');
      if(checklogout === null) {
        router.push('/sign-in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MasterLayout>
          <View className="mt-5">
            <Image source={images.profile} className="bg-secondary border-2 border-gray-500 w-[150px] h-[150px] rounded-full" resizeMode='contain'/>
          </View>
          <View className="w-full flex justify-center items-center mt-5">
            <Text className="text-white font-pmedium">Username: </Text>
            <Text className="text-white font-pmedium">email: </Text>
          </View>
          <View className="w-full">
              <CustomButton 
              title="Sign Out"
              handlePress={handleSignout} 
              />
          </View>
      </MasterLayout>
    </>
  )
}

export default ProfileScreen
