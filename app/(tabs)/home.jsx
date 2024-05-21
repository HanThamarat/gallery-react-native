import { View, Text, SafeAreaView, ScrollView, FlatList, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasterLayout from '../../components/layouts/master';
import axios from 'axios';
import baseURL from '../api/baseUrl';

const Home = () => {
  const [ Userdata, setUserdata ] = useState([]);

  const Data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

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

  useEffect(() => {
    getuserData();
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
              <Text className="text-white text-2xl font-pmedium">Card List</Text>
              <FlatList 
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                className="w-full my-2"
                data={Data}
                // renderItem={({item}) => <Item title={item.title} />}
                renderItem={({item}) => (
                  <View className="bg-secondary-100 w-[300px] mx-2 py-5 px-4 rounded-md my-2 h-[150px]">
                    <Text className="text-white text-2xl font-psemibold flex-1 justify-center">{item.title}</Text>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
            <View className="w-full mt-3">
                <Text className="text-white text-2xl font-pmedium">GirdLayout</Text>
                <View style={styles.container}>
                  <View style={[styles.box, {backgroundColor: 'orangered'}]} />
                  <View style={[styles.box, {backgroundColor: 'orange'}]} />
                  <View style={[styles.box, {backgroundColor: 'mediumseagreen'}]} />
                  <View style={[styles.box, {backgroundColor: 'deepskyblue'}]} />
                  <View style={[styles.box, {backgroundColor: 'mediumturquoise'}]} />
                  <View style={[styles.box, {backgroundColor: 'mediumslateblue'}]} />
                  <View style={[styles.box, {backgroundColor: 'purple'}]} />
                  <View style={[styles.box, {backgroundColor: 'purple'}]} />
                  <View style={[styles.box, {backgroundColor: 'purple'}]} />
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