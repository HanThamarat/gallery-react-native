import { View, Text, Alert } from 'react-native'
import { useState } from 'react'
import axios from 'axios'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MasterLayout from '../../components/layouts/master'
import FormField from '../../components/FormField'
import TextArea from '../../components/TextArea'
import CustomButton from '../../components/CustomButton'
import baseURL from '../api/baseUrl'

const Create = () => {

  const [ Form, setForm ] = useState({
      title: '',
      sumary: ''
  });

  const handleSummit = async() => {
    try {
      if (Form.title !== '' && Form.sumary !== '') {
        const Userid = await AsyncStorage.getItem('userData');
        const response = await axios.post(`${baseURL}/createGallery`, {
          title: Form.title,
          sumary: Form.sumary,
          userId: Userid,
        });
  
        if (response.status === 201) {
          await setForm({ 
            title: '',
            sumary: ''
           });
          router.push('/home');
          Alert.alert('Create gallery successfully');
        }
      } else {
        Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Create gallery faild');
    }
  };

  return (
   <MasterLayout>
    <View className="flex justify-start w-full mt-5 items-start">
      <Text className="text-xl text-white font-pmedium">Create post to gallery app</Text>

      <FormField 
        title="Title"
        placeholder=''
        value={Form.title}
        handleChangeText={(e) => {setForm({...Form, title: e})}}
        otherStyles="my-5"
      />

      <TextArea 
        title="sumary"
        placeholder=''
        value={Form.sumary}
        handleChangeText={(e) => {setForm({...Form, sumary: e})}}
        otherStyles="my-5"
      />

      <CustomButton 
        title="Create gallery"
        handlePress={handleSummit}
      />
      
    </View>
   </MasterLayout>
  )
}

export default Create