import { View, Text , ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import baseURL from '../api/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {

    const [isSubmiting, setIsSubmitting] = useState(false); 

    const [Form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${baseURL}/sign-in`, {
                email: Form.email,
                password: Form.password
            });

            if (response.status === 201) {
                const Userid = JSON.stringify(response.data['body'][0].id);
                await AsyncStorage.setItem('userData', Userid);
                Alert.alert('Authenticatin successfully')
                router.push('/home');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Authenticatin faild','Please check email and password')
        }
    };

    return (
    <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Text className="text-secondary-100 text-4xl font-pbold">Gallery</Text>
                    <Text className="text-2xl font-bold text-white mt-5">SingIn for Aora</Text>

                    <FormField 
                        title="Email"
                        value={Form.email}
                        handleChangeText={(e) => {setForm({ ...Form, email: e })}}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField 
                        title="Password"
                        value={Form.password}
                        handleChangeText={(e) => {setForm({ ...Form, password: e })}}
                        otherStyles="mt-7"
                    />

                    <CustomButton 
                        title="Sign In" 
                        handlePress={handleSubmit}
                        containerStyles="mt-7"
                        isLoading={isSubmiting}
                    />

                    <View className="flex-1 items-center pt-4">
                        <Text className="text-white text-lg font-pregular">Don't have accout? <Link href="/sign-up" className='text-blue-500 text-lg font-pregular'>Sign Up</Link></Text>
                    </View>
                </View>
            </ScrollView>
    </SafeAreaView>
    );
};

export default SignInScreen;