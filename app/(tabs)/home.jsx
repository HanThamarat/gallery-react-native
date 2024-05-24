import { View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasterLayout from '../../components/layouts/master';
import axios from 'axios';
import baseURL from '../api/baseUrl';
// import SheetView from '../../components/SheetView';

const Home = () => {
  const [ Userdata, setUserdata ] = useState([]);
  const [ Gallery, setGallery ] = useState([]);
  const [ GalleryDate, setGalleryDate ] = useState([]);

  const GalCount = async() => {
    try {
      const response = await axios.get(`${baseURL}/getCountDate`);

      if (response.status === 200) {
        setGalleryDate(response.data['body']);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getuserData = async() => {
    try {
      const userIdValue = await AsyncStorage.getItem('userData');
      if (userIdValue !== null) {
          const response = await axios.get(`${baseURL}/userData/${userIdValue}`);
          if (response.status === 200) {
              setUserdata(response.data['body'][0]);
          }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Get user data err');
    }
  };

  const getGallery = async() => {
    try {
      const response = await axios.get(`${baseURL}/allGallery`);
      
      if (response.status === 200) {
        setGallery(response.data['body']);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getuserData();
    getGallery();
    GalCount();
  },[])

  const Item = ({title}) => {
    <View className="border-white border-2 w-full py-10 px-4 rounded-md">
        <Text className="text-white text-2xl flex-1 justify-center">{title}</Text>
    </View>
  };

  return (
    <>
    { Userdata &&
          <MasterLayout>
            <View className="w-full">
                <Text className="text-white text-2xl font-pmedium">Hello, Wellcome</Text>
                <Text className="text-white text-xl font-psemibold">{Userdata.username}</Text>
            </View>
            <View className="w-full mt-3">
              <Text className="text-white text-2xl font-pmedium">Today Galler</Text>
              <FlatList 
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                className="w-full my-2"
                data={GalleryDate}
                // renderItem={({item}) => <Item title={item.title} />}
                renderItem={({item}) => (
                  <View className="bg-secondary-100 w-[300px] mx-2 py-5 px-4 rounded-md my-2 h-[150px]">
                    <Text className="text-white text-2xl font-psemibold flex-1 justify-center">{item.title}</Text>
                    <Text className="text-sm text-white font-pregular">{item.sumary}</Text>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
            <View className="w-full mt-3">
                <Text className="text-white text-2xl font-pmedium">All Gallery</Text>
                <View style={styles.container}>
                  <FlatList
                    className="w-full my-2"
                    data={Gallery}
                    renderItem={({item}) => (
                      <View className="bg-secondary-200 px-4 py-4 w-full rounded-md my-2">
                        <Text className="text-xl font-pmedium text-white">{item.title}</Text>
                        <Text className="text-sm font-pregular text-white"><Text className="text-primary">Create post by</Text> {item.username}</Text>
                        <Text className="text-sm font-pregular text-white"><Text className="text-primary">Sumary : </Text>{item.sumary}</Text>
                      </View>
                    )}
                   />
                </View>
            </View>
        </MasterLayout>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: '10',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  box: {
    borderRadius: 10,
    width: 174,
    height: 200,
  },
});

export default Home