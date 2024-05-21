import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { icons } from '../../constants';

const tabData = [
    {
        title: 'Home',
        tabName: 'home',
        icons: icons.home,
        nameI: 'Home',
    },
    {
        title: 'Maps',
        tabName: 'bookmark',
        icons: icons.bookmark,
        nameI: 'Maps',
    },
    {
        title: 'Create',
        tabName: 'create',
        icons: icons.plus,
        nameI: 'Create',
    },
    {
        title: 'Profile',
        tabName: 'profile',
        icons: icons.profile,
        nameI: 'Profile',
    },
];

const TabIcon = ({ icon, color, name, focused }) => {
    return(
        <View className="flex-1 justify-center items-center gap-y-1 my-1">
            <Image source={icon} resizeMode='contain' tintColor={color} className="w-6 h-6" />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color : color }}>{name}</Text>
        </View>
    );
};

const TabLayout = () => {
  return (
   <>
    <Tabs screenOptions={{ 
            tabBarShowLabel: false ,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#2322533',
                height: 84,
            }
        }}>
        {tabData.map((item, key) => (
             <Tabs.Screen 
                color=''
                key={key}
                name={item.tabName}
                options={{
                    title: item.title,
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon icon={item.icons} color={color} name={item.nameI} focused={focused} />
                    )
                }}
            />
        ))}
    </Tabs>
   </>
  )
}

export default TabLayout