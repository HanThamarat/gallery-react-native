import { Text, View, Alert } from 'react-native';
import { router } from 'expo-router';
import React from 'react'
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
