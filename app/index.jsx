import { Text, View, ScrollView, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const HomeScreen = () => {

  const check = async () => {
    const checkUserLogin = await AsyncStorage.getItem('userData');
    if (checkUserLogin !== null) {
        router.replace('/home');
    } 
  };
  
  useEffect(() => {
    check();
  },[]);

  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain' />
            <Image source={images.cards} className="w-[300px] h-[300px]" resizeMode='contain' />
            <Text className="text-white text-2xl font-bold">Enjoy for Aora App</Text>

            <CustomButton 
                title="Continue with email"  
                handlePress={() => {
                    router.push('/sign-in')
                }}
            />
        </View>
    </ScrollView>

    <StatusBar backgroundColor="#161622" style='light' />
   </SafeAreaView>
  );
}

export default HomeScreen