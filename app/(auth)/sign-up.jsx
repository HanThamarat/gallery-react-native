import { View, Text , ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import baseURL from '../api/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {

    const [isSubmiting, setIsSubmitting] = useState(false); 

    const [Form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${baseURL}/create`, {
                username: Form.username,
                email: Form.email,
                password: Form.password
            })
    
           console.log(response.status);
           console.log(response.data);
           if (response.status == 201) {
                const UserjsonValue = JSON.stringify(response.data['body'].insertId);
                await AsyncStorage.setItem('userData', UserjsonValue);
                Alert.alert('success', 'create user successfully')
                router.navigate('/home');
           }
        } catch(err) {
            console.log(err);
            Alert.alert('Error', err);
        }
    };


    return (
    <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                <Text className="text-secondary-100 text-4xl font-pbold">Gallery</Text>
                    <Text className="text-2xl font-bold text-white mt-5">SingUp for Aora</Text>

                    <FormField 
                        title="Username"
                        value={Form.username}
                        handleChangeText={(e) => {setForm({ ...Form, username: e })}}
                        otherStyles="mt-7"
                        keyboardType=""
                    />

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
                        title="Sign Un" 
                        handlePress={handleSubmit}
                        containerStyles="mt-7"
                        isLoading={isSubmiting}
                    />

                    <View className="flex-1 items-center pt-4">
                        <Text className="text-white text-lg font-pregular">Have an accout? <Link href="/sign-in" className='text-blue-500 text-lg font-pregular'>Sign In</Link></Text>
                    </View>
                </View>
            </ScrollView>
    </SafeAreaView>
    );
};

export default SignUpScreen;